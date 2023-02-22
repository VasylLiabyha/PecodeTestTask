// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import "cypress-audit/commands";
import "cypress-real-events/support";

const compareSnapshotCommand = require('cypress-image-diff-js/dist/command')
compareSnapshotCommand();

Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false
})

Cypress.Commands.add(
  'isRequired',
  {
    prevSubject: true
  },
  (subject) => {

    cy.wrap(subject)
      .then( (allInput) => {
        Array.prototype.slice.call(allInput).forEach( (input) => {
          cy.wrap(input).isHighlightedRed();
      });
   });

  }
);

Cypress.Commands.add(
  'isNotRequired',
  {
    prevSubject: true
  },
  (subject) => {

    Array.prototype.slice.call(subject).forEach( (singleInput) => {
      cy.wrap(singleInput).hasDefaultColor();
    });

  }
);

Cypress.Commands.add(
  'negativeValidationWith',
  {
    prevSubject: true
  },
  (subject, ...args) => {

    Array.prototype.slice.call(args).forEach( (testData) => {
      cy.wrap(subject)
        .clear()
        .type(testData)
        .blur();

      // cy.wrap(subject).invoke('attr', 'aria-invalid').should('be.eq', 'true');
      // cy.wrap(subject).parent('div').siblings('span').then( (errorMsg) => {
      //   cy.wrap(errorMsg)
      //     .invoke("attr", 'style')
      //     .should('be.eq', 'display: inline;');
      //   cy.wrap(errorMsg)
      //     .invoke("text")
      //     .should('match', /Please enter*/);
      // })

      cy.wrap(subject).isHighlightedRed()
        .clear();

    });
  }
);

Cypress.Commands.add(
  'positiveValidationWith',
  {
    prevSubject: true
  },
  (subject, ...args) => {

    Array.prototype.slice.call(args).forEach( (testData) => {
      cy.wrap(subject)
        .clear()
        .type(testData)
        .blur();
      cy.wrap(subject)
        .hasDefaultColor()
        .invoke('attr', 'aria-invalid').should('be.eq', 'false');

    });
  }
);

Cypress.Commands.add(
  'checkBordersColor',
  {
    prevSubject: true
  },
  (subject,borderColor) => {
      cy.wrap(subject)
        .should('have.css', 'border-top-color', borderColor)
        .should('have.css', 'border-bottom-color', borderColor)
        .should('have.css', 'border-left-color', borderColor)
        .should('have.css', 'border-right-color', borderColor);
      cy.wrap(subject);
  }
);

Cypress.Commands.add(
  'compareWithGivenArray',
  {
    prevSubject: true
  },
  (subject,givenArray) => {
      cy.wrap(subject)
        .then( (values) => {
          return (
            Cypress.$.makeArray(values)
              // and extract inner text from each
              .map((value) => value.innerText)
          )
      }).should('deep.equal', givenArray);
  }
);

Cypress.Commands.add(
  'isHighlightedRed',
  {
    prevSubject: true
  },

  (subject) => {
    cy.wrap(subject).checkBordersColor('rgb(220, 53, 69)');
}
);

Cypress.Commands.add(
  'hasDefaultColor',
  {
    prevSubject: true
  },
  (subject) => {
      cy.wrap(subject).checkBordersColor('rgb(218, 225, 227)');
  }
);

Cypress.Commands.add(
  'selectRandomOption',
  {
    prevSubject: true
  },
  (subject) => {

    cy.wrap(subject)
      .find('option')
      .then( function (allOptions) {

        const randomOption = Math.trunc(Math.random() * (allOptions.length - 2)) + 1;

        cy.wrap(allOptions).eq(randomOption).invoke("text").as('shouldBeSelected');
        cy.wrap(subject).select(randomOption);
        cy.wrap(subject).find(':selected').invoke("text")
          .then(function (selectedOption) {
            expect(selectedOption).to.be.eq(this.shouldBeSelected);
        });
    });
  }
);

Cypress.Commands.overwrite('should', (should, ... args) => {
  const alliases = cy.state('alliases');
  const lookedUp = args.map((arg) => {
    if (typeof a === 'string' && args[0] === '@') {
      const key = arg.slice(1);
      if (key in alliases) {
        return alliases[key].subject;
      }
    }
    return arg;
  });
  return should(...lookedUp);
});

Cypress.Commands.add("login", (email = null, password = null) => {
  email = email || Cypress.env('email')
  password = password || Cypress.env('password')
  cy.session([email, password], () => {
    cy.request({
      method: "GET",
      url: '/sanctum/csrf-cookie',
    });
    cy.getCookie('XSRF-TOKEN')
      .then((cookie) => {
        cy.request({
          method: 'POST',
          url: '/login',
          form: false,
          body: {
          email,
          password
        },
        headers: {
          'X-XSRF-TOKEN': decodeURIComponent(cookie.value)
        }
      })
    })
  })
})

Cypress.Commands.add(
  'setWidgetData',
  (count, totalAmount) => {

    cy.fixture("homeWidget", null)
    .invoke('toString')
    .invoke('replace','resultForCount',count)
    .invoke('replace','resultForAmount',totalAmount)
    .then(JSON.parse)
    .then(function (data) {
      this.data = data
    })

  }
);