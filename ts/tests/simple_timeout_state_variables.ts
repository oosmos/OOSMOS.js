import { StateMachine } from '../OOSMOS';

class TimeoutTest extends StateMachine {
  constructor() {
    super({ DEFAULT: 'A',
      A: function() {
        var Count = 0;

        return {
          ENTER: function() {
            Count += 1;
            this.Print("In state A, Count = "+Count);
            this.SetTimeoutSeconds(4);
          },
          TIMEOUT: function() {
            this.Transition('B');
          },
        };
      },

      B: {
        ENTER: function() {
          this.Print("In state B");
          this.SetTimeoutSeconds(1);
        },
        TIMEOUT: function() {
          this.Transition('A');
        },
      },
    });
  }
}

const pTimeoutTest = new TimeoutTest();
pTimeoutTest.SetDebug(true);
pTimeoutTest.Start();
