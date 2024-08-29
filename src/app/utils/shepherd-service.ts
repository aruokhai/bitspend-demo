/* eslint-disable no-useless-escape */
export const defaultStepOptions =  {
  classes: 'custom-class-name-1 custom-class-name-2',
  useModalOverlay: true,
  exitOnEsc: true,
  scrollTo: true,
  cancelIcon: {
    enabled: true
  }
}

export const steps = 
    [
    {
      id: 'step1',
      attachTo: { 
        element: '', 
        on: "top"
      },
      beforeShowPromise: function() {
        return new Promise<void>(function(resolve) {
          setTimeout(function() {
            window.scrollTo(0, 0);
            resolve();
          }, 500);
        });
      },
      buttons: [
        {
          classes: 'shepherd-button-secondary',
          text: 'Skip',
          type: 'cancel'
        },
        {
          classes: 'shepherd-button-primary',
          text: 'Next',
          type: 'next',
        }
      ],
      cancelIcon: {
        enabled: true
      },
      classes: 'custom-class-name-1 custom-class-name-2',
      highlightClass: 'highlight',
      scrollTo: false,
      title: 'Welcome to Bitspend!',
      text: ['Let’s start with a quick tour and we will have you up and running in no time'],
      when: {
        show: () => {
          console.log('show step');
        },
        hide: () => {
          console.log('hide step');
        }
      }
    },
      {
      id: 'step2',
      attachTo: { 
        element: '.create-wallet', 
        on: "top"
      },
      beforeShowPromise: function() {
        return new Promise<void>(function(resolve) {
          setTimeout(function() {
            window.scrollTo(0, 0);
            resolve();
          }, 500);
        });
      },
      classes: '',
      buttons: [
        {
          classes: 'shepherd-button-secondary',
          text: 'Skip',
          type: 'cancel'
        },
        {
          classes: 'shepherd-button-primary',
          text: 'Next',
          type: 'next',
        }
      ],
      cancelIcon: {
        enabled: true
      },
      highlightClass: 'highlight',
      scrollTo: { behavior: 'smooth', block: 'center' },
      title: 'You need a wallet!',
      text: ['First, you need to create a wallet. This is like a bank where you store your money so it is readily available when you need to make an online payment.'],
      when: {
        show: () => {
          console.log('show step');
        },
        hide: () => {
          console.log('hide step');
        }
      }
    },
      {
      id: 'step3',
      attachTo: { 
        element: '.deposit', 
        on: "bottom"
      },
      beforeShowPromise: function() {
        return new Promise<void>(function(resolve) {
          setTimeout(function() {
            window.scrollTo(0, 0);
            resolve();
          }, 500);
        });
      },
      buttons: [
        {
          classes: 'shepherd-button-secondary',
          text: 'Skip',
          type: 'cancel'
        },
        {
          classes: 'shepherd-button-primary',
          text: 'Next',
          type: 'next',
        }
      ],
      cancelIcon: {
        enabled: true
      },
      highlightClass: 'highlight',
      scrollTo: { behavior: 'smooth', block: 'center' },
      title: 'You need some cash!',
      text: ['Next, you need to deposit some money into your wallet. This money is in your local currency, so you don’t have to worry about conversion rates.'],
      when: {
        show: () => {
          console.log('show step');
        },
        hide: () => {
          console.log('hide step');
        }
      }
    },
      {
      id: 'step4',
      attachTo: { 
        element: '.pay', 
        on: "bottom"
      },
      beforeShowPromise: function() {
        return new Promise<void>(function(resolve) {
          setTimeout(function() {
            window.scrollTo(0, 0);
            resolve();
          }, 500);
        });
      },
      buttons: [
        {
          classes: 'shepherd-button-secondary',
          text: 'Exit',
          type: 'cancel'
        },
        {
          classes: 'shepherd-button-primary',
          text: 'Next',
          type: 'next',
        }
      ],
      cancelIcon: {
        enabled: true
      },
      highlightClass: 'highlight',
      scrollTo: { behavior: 'smooth', block: 'center' },
      title: 'You are ready to make a payment!',
      text: ['You need to get an invoice from the merchant you want to make payment to. Then, you simply need to paste it here and we’ll handle the rest. Cool right?'],
      when: {
        show: () => {
          console.log('show step');
        },
        hide: () => {
          console.log('hide step');
        }
      }
    },
      {
      id: 'step5',
      attachTo: { 
        element: '.withdraw', 
        on: "top"
      },
      beforeShowPromise: function() {
        return new Promise<void>(function(resolve) {
          setTimeout(function() {
            window.scrollTo(0, 0);
            resolve();
          }, 500);
        });
      },
      buttons: [
        {
          classes: 'shepherd-button-primary',
          text: 'Finish',
          type: 'next',
        }
      ],
      cancelIcon: {
        enabled: true
      },
      highlightClass: 'highlight',
      scrollTo: { behavior: 'smooth', block: 'center' },
      title: 'Withdraw your money any time!',
      text: ['Got excess cash after making a payment? You have full control over your money and can withdraw it any time you like.'],
      when: {
        show: () => {
          console.log('show step');
        },
        hide: () => {
          console.log('hide step');
        }
      }
    },

]


export const requiredElements = [
  // {
  //   selector: '.main-cont',
  //   message: 'No search results found. Please execute another search, and try to start the tour again.',
  //   title: 'No results'
  // },
  // {
  //   selector: '.main-content',
  //   message: 'User not logged in, please log in to start this tour.',
  //   title: 'Please login'
  // },
];