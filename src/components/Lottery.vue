<template>
  <div class="container">
    <!-- if we don't have anything in sections 3 and 4, put the sections 1 and 2 in the middle of the page -->
    <div :class="pickedLotteryBalls.length < 1 || tickets.length < 1 ? 'justify-content-center' : ''" class="row mb-3 mx-5">
      <div v-if="pickedLotteryBalls.length > 0 || tickets.length > 0" class="col-xl-8 p-0">

        <div id="section3" v-if="pickedLotteryBalls.length > 0" class="card bg-light">
          <div class="mx-auto">
            <div class="fixed-width">
                <!-- if we want to break 12 lottery balls in 2 rows - 6 balls per row, we need the first v-for to implement 2 flexbox fields,
                and slice() on second v-for to cut unnecessary numbers -->
                <div class="d-flex" v-for="i in pickedLotteryBallsCOUNTER.length / 6">
                  <div v-for="pickedLotteryBall in pickedLotteryBalls.slice((i - 1) * 6, i * 6)">
                    <button class="btn btn-info btn-circle float-left m-2 animated bounceIn">{{pickedLotteryBall}}</button>
                  </div>
                </div>
            </div>
          </div>
        </div>

        <div id="section4" class="card bg-light">
          <ul v-for="(ticket, index1) in tickets" class="list-group list-group-flush animated bounceIn">
            <!-- if we have any results, bring the results; if every value in the array is true, paint this tag in green, but if we have at least one false value, paint it in red -->
            <li :class="bringResults() ? bringResults()[index1].every(val => val == true) ? 'list-group-item-success' : 'list-group-item-danger' : ''" class="list-group-item">
              <!-- if we have any results, bring the results, otherwise - leave the button color in blue; if the value is true, paint the button in green, but if the value is false, paint the button in red -->
              <button v-for="(number, index2) in ticket" :class="bringResults() ? bringResults()[index1][index2] == true ? 'btn-success' : 'btn-danger' : 'btn-primary'" class="btn btn-circle float-left mr-1">{{number}}</button>
              <!-- if we have any results, bring the results, otherwise - don't show this badge; if every value in the array is true, show this badge, but if we have at least one false value, don't show this badge -->
              <h5 v-if="bringResults() ? bringResults()[index1].every(val => val == true) : false"><span class="badge badge-pill badge-success float-right mt-2 animated bounceIn">WIN</span></h5>
              <!-- if we have any results, bring the results, otherwise - don't show this badge; if one value in the array is false at least, then show this badge, but if the array doesn't have false values at all, don't show this badge -->
              <h5 v-if="bringResults() ? bringResults()[index1].includes(false) : false"><span class="badge badge-pill badge-danger float-right mt-2 animated bounceIn">LOSS</span></h5>
            </li>
          </ul>
        </div>

        <div v-if="bringResults() ? true : false" id="section4" class="card bg-light">
          <table class="table m-0">
            <tbody>
              <tr>
                <th class="text-left">Results</th>
                <th class="text-left">Payment</th>
                <th class="text-left">Quota</th>
                <th class="text-left">Prize</th>
              </tr>
              <tr v-for="(ticket, index1) in tickets" :class="bringResults() ? bringResults()[index1].every(val => val == true) ? 'table-success' : 'table-danger' : ''">
                <td class="text-left small">
                  <button v-for="(number, index2) in ticket" :class="bringResults() ? bringResults()[index1][index2] == true ? 'btn-success' : 'btn-danger' : 'btn-primary'" class="btn btn-circle-sm">{{number}}</button>
                </td>
                <td class="text-left small">{{formatter.format(inputCash[index1])}}</td>
                <td class="text-left small">{{quota[index1]}}</td>
                <td class="text-left small" v-if="bringResults() ? bringResults()[index1].every(val => val == true) : false">{{formatter.format(prize[index1])}}</td>
                <td class="text-left small" v-if="bringResults() ? bringResults()[index1].includes(false) : false">$0.00</td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
      <div class="col-xl-4 p-0">

        <div id="section1" class="card bg-light">
          <!-- if we want to break 30 buttons in 5 rows - 6 buttons per row, we need the first v-for to implement 5 flexbox fields,
          and slice() on second v-for to cut unnecessary numbers -->
          <div class="d-flex justify-content-center" v-for="i in numbers.length / 6">
            <div v-for="number in numbers.slice((i - 1) * 6, i * 6)" :key="number.id">
              <button @click="selectNumbers($event), number.selectedNumber = !number.selectedNumber" type="button" :value="number.id" :class="number.selectedNumber == true ? 'btn-success' : 'btn-primary'" class="btn text-white btn-circle m-2 animated bounceIn">{{number.id}}</button>
            </div>
          </div>
        </div>

        <div id="section2" :class="i < 1 ? 'bg-danger' : 'bg-primary'" class="card">
          <button v-if="i > 0" @click="addTicket()" class="btn btn-primary">ADD TICKET ({{i}})</button>
          <button v-if="i < 1" @click.once="start()" class="btn btn-danger" v-html="buttonStart">{{buttonStart}}</button>
        </div>

      </div>
    </div>

  </div>
</template>


<script>
export default {
  data() {
    return {

      numbers: [
        {id: 1, selectedNumber: false},
        {id: 2, selectedNumber: false},
        {id: 3, selectedNumber: false},
        {id: 4, selectedNumber: false},
        {id: 5, selectedNumber: false},
        {id: 6, selectedNumber: false},
        {id: 7, selectedNumber: false},
        {id: 8, selectedNumber: false},
        {id: 9, selectedNumber: false},
        {id: 10, selectedNumber: false},
        {id: 11, selectedNumber: false},
        {id: 12, selectedNumber: false},
        {id: 13, selectedNumber: false},
        {id: 14, selectedNumber: false},
        {id: 15, selectedNumber: false},
        {id: 16, selectedNumber: false},
        {id: 17, selectedNumber: false},
        {id: 18, selectedNumber: false},
        {id: 19, selectedNumber: false},
        {id: 20, selectedNumber: false},
        {id: 21, selectedNumber: false},
        {id: 22, selectedNumber: false},
        {id: 23, selectedNumber: false},
        {id: 24, selectedNumber: false},
        {id: 25, selectedNumber: false},
        {id: 26, selectedNumber: false},
        {id: 27, selectedNumber: false},
        {id: 28, selectedNumber: false},
        {id: 29, selectedNumber: false},
        {id: 30, selectedNumber: false}
      ],
      selectedNumbers: [],
      inputCash: [],
      quota: [],
      tickets: [],
      // this i number calculates remaining tickets and with this number we can adjust appearing ADD TICKET and START buttons
      i: 5,
      lotteryBalls: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
      pickedLotteryBalls: [],
      pickedLotteryBallsCOUNTER: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      progressBarNumber: 0,
      buttonStart: 'START',
      resultsTrigger: 0,
      results: [],
      // https://flaviocopes.com/how-to-format-number-as-currency-javascript/
      formatter: new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
      }),
      prize: []

    }
  },
  methods: {


    selectNumbers(e) {
      this.alertBeforeReset();
      let array = this.selectedNumbers;
      let value = Number(e.target.value);
      let index = array.indexOf(value);
      // if you click a number for the first time, push it into array
      if (index == -1) {
        array.push(value);
      } else {
        // if you click on the chosen number again, you will delete the number
        array.splice(index, 1);
      }
    },



    async addTicket() {
      if (this.selectedNumbers.length < 1 || this.selectedNumbers.length > 5) {
        Swal.fire({
          type: 'error',
          title: 'Warning!',
          text: 'The minimum amount of the selected numbers is 1. The maximum amount of the selected numbers is 5.'
        })
      }
      else if (this.pickedLotteryBalls.length == 12) {
        this.alertBeforeReset();
      }
      else {
        const {value: cash} = await Swal.fire({
          title: 'Pay desired amount ($):',
          input: 'number'
        })
        // if you don't want to pay for the ticket, the code will not accept it
        if (cash == '' || cash == 0) {
          Swal.fire('You must pay some amount of money to lottery accept the ticket.')
        }
        else if (cash != undefined) {
          // store money of the tickets here
          this.inputCash.push(Math.abs(Number(cash)));

          // determine quota according to the number of numbers in the ticket
          if (this.selectedNumbers.length == 1) {
            this.quota.push(2);
          } else if (this.selectedNumbers.length == 2) {
            this.quota.push(5);
          } else if (this.selectedNumbers.length == 3) {
            this.quota.push(10);
          } else if (this.selectedNumbers.length == 4) {
            this.quota.push(500);
          } else if (this.selectedNumbers.length == 5) {
            this.quota.push(1000);
          }

          // if we want to push the arrays, we need to clone the arrays, because array is reference value!! https://www.samanthaming.com/tidbits/35-es6-way-to-clone-an-array
          this.tickets.push([...this.selectedNumbers]);
          // delete previously selected numbers
          this.selectedNumbers = [];
          // and set the all booleans to false, in order to turn back all number buttons to 'btn-primary'
          this.numbers.forEach(function(element) {
            element.selectedNumber = false;
          });
          // how many tickets are left
          this.i = this.i - 1;

          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000
          });
          Toast.fire({
            type: 'success',
            title: 'Ticket added'
          })
        }
      }
    },



    start() {
      let x = 1;
      let intervalID = setInterval(function () {
        // delete random number from lotteryBalls array, and that deleted number push in pickedLotteryBalls array
        let integer = this.lotteryBalls.splice(Math.floor(Math.random() * this.lotteryBalls.length), 1)[0];
        this.pickedLotteryBalls.push(integer);

        // vue-progressbar
        this.progressBarNumber = this.progressBarNumber + 8.3333;
        this.$Progress.set(this.progressBarNumber);

        // when setInterval reach 12th number, stop counting
        if (x++ == 12) {
          window.clearInterval(intervalID);
          // when setInterval reach 12th number, return ADD TICKET button with 5 tickets available
          this.i = 5;
          this.$Progress.finish();
          Swal.fire({
            position: 'center',
            type: 'success',
            title: 'Lottery finished',
            showConfirmButton: false,
            timer: 1500
          })
          // bring the lottery results
          this.lotteryResults();
          // this resultsTrigger will coll the bringResults() function
          this.resultsTrigger = 1;
        }
      }.bind(this), 2000);

      // this is for displaying arrows after START button is clicked
      setInterval(function () {
        if (this.buttonStart == 'START') {
          return this.buttonStart = '&#10148;';
        } else if (this.buttonStart == '&#10148;') {
          return this.buttonStart = '&#10148; &#10148;';
        } else if (this.buttonStart == '&#10148; &#10148;') {
          return this.buttonStart = '&#10148; &#10148; &#10148;';
        } else if (this.buttonStart == '&#10148; &#10148; &#10148;') {
          return this.buttonStart = '&#10148;';
        }
      }.bind(this), 666);
    },



    lotteryResults() {
      //concatenated multiple arrays from this.tickets to one array of numbers
      let x = [].concat(...this.tickets);
      let xBool = [];
      let finalBoolResults = [];

      // with this loop we are going to check if any of x numbers we have in this.pickedLotteryBalls array
      // returned booleans we are going to push into xBool array
      x.forEach((element) => {
        xBool.push(this.pickedLotteryBalls.includes(element));
      });

      // now we need to pack xBool array in multidimensional array in the same order like this.tickets array
      this.tickets.forEach((element) => {
        finalBoolResults.push(xBool.slice(0, element.length));
        xBool.splice(0, element.length);
      });

      // store the multidimensional array
      this.results = finalBoolResults;

      this.getPrize();
    },



    getPrize() {
      this.results.forEach((element, index) => {
        if (element.every(val => val == true)) {
          this.prize.push(this.inputCash[index] * this.quota[index]);
        }else if (element.includes(false)) {
          this.prize.push(0);
        }
      });
    },



    bringResults() {
      if (this.resultsTrigger == 1) {
        return this.results;
      }
    },



    alertBeforeReset() {
      // if all lottery balls are picked, we need to avoid any possibility for losing the data without the player's explicit permission
      if (this.pickedLotteryBalls.length == 12) {
        Swal.fire({
          title: 'Are you sure?',
          text: "If you want to start a new game, all existing results will be deleted!",
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Start a new game',
          cancelButtonText: 'Not now'
        }).then((result) => {
          if (result.value) {
            this.gameReset();
          }
        })
      }
    },



    // go back to the beginning (re-render this component)
    gameReset() {
      this.$emit('reset');
    }



  }
}
</script>


<style scoped>
.fixed-width {
  width: 336px;
}

.btn-circle {
  width: 40px;
  height: 40px;
  padding: 6px 0px;
  border-radius: 25px;
  text-align: center;
  font-size: 15px;
  line-height: 1.42857;
}

.btn-circle-sm {
  width: 15px;
  height: 15px;
  padding: 0px 0px;
  border-radius: 25px;
  text-align: center;
  font-size: 10px;
  line-height: 1.42857;
}

.bounceIn {
  animation-duration: 0.2s;
}

#section3, #section4, #section1 {
  margin-bottom: 10px;
}

#section3, #section4 {
  margin-right: 5px;
}

#section1, #section2 {
  margin-left: 5px;
}

@media only screen and (max-width: 1200px) {
  #section3, #section4 {
    margin-right: 0px;
  }
  #section1, #section2 {
    margin-left: 0px;
  }
}

@media only screen and (max-width: 494px) {
  .container {
    min-width: 494px;
  }
  .row {
    margin-left: 0px !important;
    margin-right: 0px !important;
  }
}
</style>
