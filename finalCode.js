<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Mini App</title>
    <style>
      body {
        margin: 0;
        padding: 1em;
        background: #fff;
      }
      
      [data-cart-info],
      [data-credit-card] {
        transform: scale(0.78);
    	margin-left: -3.4em;
      }
      [data-cart-info] span{
        display: inline-block;
        vertical-align: middle;
      }
      .material-icons {
        font-size: 150px;
      }
      [data-credit-card] {
        width: 435px;
        min-height: 240px;
        border-radius: 10px;
        background-color: #5d6874;
      }
      
      [data-card-type]{
        display: block;
        width: 120px;
        height: 60px;
      }
      
      [data-cc-digits] {
        margin-top: 2em;
      }
      
      [data-cc-digits] input {
        color: #fff;
        font-size: 2em;
        line-height: 2em;
        border: none;
        background: none;
        margin-right: 0.5em;
      }
      
      [data-cc-info] {
        margin-top: 1em;
      }
      
      [data-cc-info] input {
        color:#fff;
        font-size: 1.2em;
        border: none;
        background: none;
      }
      
      [data-cc-info] input:nth-child(2n) {
        padding-right: 10px;
        float: right;
      }
      
      [data-pay-btn] {
        position: fixed;
        width: 90%;
        border: 1px solid;
        bottom: 20px;
      }
      
      [data-cc-info] input:focus,
      [data-cc-digits] input:focus {
        outline: none;
      }

      .mdc-card__primary-action,
      .mdc-card__primary-action:hover {
        cursor: auto;
        padding: 20px;
        min-height: inherit;
      }
      
      [data-credit-card] [data-card-type] {
        transition: width 1.5s;
        margin-left: calc(100% - 130px);
      }

      [data-credit-card].is-visa {
        background: linear-gradient(135deg, #622774 0%, #c53364 100%);
      }

      [data-credit-card].is-mastercard {
        background: linear-gradient(135deg, #65799b 0%, #5e2563 100%);
      }

      .is-visa [data-card-type],
      .is-mastercard [data-card-type] {
        width: auto;
      }

      input.is-invalid,
      .is-invalid input {
        text-decoration: line-through;
      }

      ::placeholder {
        color: #fff;
      }
    </style>
  </head>
  <body>
    <div data-cart-info>
      <h3 class="mdc-typography--headline4">
        <span class="material-icons">shopping_cart</span>
        <span data-bill></span>
      </h3>
    </div>
    <div data-credit-card class="mdc-card mdc-card--outlined">
      <div class="mdc-card__primary-action">
        <img src="https://placehold.it/120x60.png?text=Card" data-card-type>
        <div data-cc-digits>
          <input type="text" size="4" placeholder="----">
          <input type="text" size="4" placeholder="----">
          <input type="text" size="4" placeholder="----">
    	  <input type="text" size="4" placeholder="----">
        </div> 
		<div data-cc-info>
          <input type="text" size="20" placeholder="Name Surname">
		  <input type="text" size="6" placeholder="MM/YY">
		</div>
      </div>
    </div>
	<button class="mdc-button" data-pay-btn>Pay & Checkout Now</button>
    <script>
      
      const supportedCards = {
        visa, mastercard
      };
      
      const countries = [
        {
          code: "US",
          currency: "USD",
          country: 'United States'
        },
        {
          code: "NG",
          currency: "NGN",
          country: 'Nigeria'
        },
        {
          code: 'KE',
          currency: 'KES',
          country: 'Kenya'
        },
        {
          code: 'UG',
          currency: 'UGX',
          country: 'Uganda'
        },
        {
          code: 'RW',
          currency: 'RWF',
          country: 'Rwanda'
        },
        {
          code: 'TZ',
          currency: 'TZS',
          country: 'Tanzania'
        },
        {
          code: 'ZA',
          currency: 'ZAR',
          country: 'South Africa'
        },
        {
          code: 'CM',
          currency: 'XAF',
          country: 'Cameroon'
        },
        {
          code: 'GH',
          currency: 'GHS',
          country: 'Ghana'
        }
      ];
      
      const appState = {
        
      };
      
    const formatAsMoney = (amount, buyerCountry) =>{
          for(let i = 0; i < countries.length; i++){
            if (buyerCountry == countries[i].country){
              code = countries[i].code;          
              currency = countries[i].currency;
          return amount.toLocaleString("en-" + code, {style:'currency', currency: currency})
            }

          }
         return amount.toLocaleString("en-US", {style:'currency', currency: "USD"})
        }; 
      
     const flagIfInvalid = (field, isValid) => {
         isValid ? field.classList.remove('is-invalid') : field.classList.add('is-invalid');
        }
       const expiryDateFormatIsValid = (target) => {
          const regex = /(?:0[1-9]|1[0-2]\/[0-9]{2})/;
          return target.match(regex)
        }
      
      const detectCardType = ({target}) => {
		let dataCreditCard = document.querySelector('[data-credit-card]');
      	let dataCardType = document.querySelector('[data-card-type]');
		let cardType;
        dataCreditCard.classList.remove('is-mastercard');
        dataCreditCard.classList.remove('is-visa');
        dataCardType.src = 'https://placehold.it/120x60.png?text=Card';
      if (target.value.charAt(0)==='4'){
        dataCreditCard.classList.remove('is-mastercard');
        dataCreditCard.classList.add('is-visa');
        dataCardType.src = supportedCards.visa;
        cardType = 'is-visa';
      }else if (target.value.startsWith("5")){
        dataCreditCard.classList.remove('is-visa');
        dataCreditCard.classList.add('is-mastercard');
        dataCardType.src = supportedCards.mastercard;
        cardType = "is-mastercard";
      } 
      return cardType;
      };
      
      const validateCardExpiryDate = ({target}) => {
		let result = expiryDateFormatIsValid(target.value);
        if (result){
          let theDate = target.value.split('/');
          const month = theDate[0];
          const year = '20' + theDate[1];
          const expDate = new Date(year + '-' + month + '-01');
          if (expDate > new Date()){
            flagIfInvalid(target, true);
            return true;
          }else {
            flagIfInvalid(target, false)
            return false;
          }
        }
        
      };
      
      const validateCardHolderName = ({target }) => {
          const field = document.querySelector('[data-cc-info] input:first-child');
          //console.log(field);
          const regex = /^[a-zA-Z]{3,}\s[a-zA-Z]{3,}$/;
          if (target.value.match(regex)){
           flagIfInvalid(field, true);
            return true;
          }
          flagIfInvalid(field,false);
          return false;
        }
      
     
      
     const validateCardNumber = () => {
        const digit = document.querySelectorAll("[data-cc-digits] input");
        let digits = "";
        digit.forEach(d => digits += d.value);
        
        let cardNo = (digits.toString()).split('').map(function(t){return parseInt(t)});
           
        if(validateWithLuhn(cardNo)){
          document.querySelector("[data-cc-digits]").classList.remove("is-invalid");
        }else{
          document.querySelector("[data-cc-digits]").classList.add("is-invalid");
        }
        
        
        return validateWithLuhn(cardNo);
      }
      
      const validateWithLuhn = (digits) => {
        const arr = []
          for (let i = 0; i < digits.length; i++) {
            if (i % 2 == 0) {
              if (digits[i]*2 < 10) {
                arr.push(digits[i]*2);
              } else {
                arr.push(digits[i]*2-9);
              }
            } else {
              arr.push(parseInt(digits[i],10))
            }
          }
          return arr.reduce( (prv, cur) => prv + cur) % 10 === 0;
      }
      
    const uiCanInteract = () => {
          const card = document.querySelector('[data-cc-digits] > input');
          card.addEventListener('blur', detectCardType);
          
          const data_cc_digits_input_one = document.querySelector('div[data-cc-digits]>input:nth-child(1)');       
          const data_cc_digits_input_three = document.querySelector('[data-cc-info] input:last-child');
          
          const button_pay = document.querySelector('[data-pay-btn]');
          button_pay.addEventListener('click',  () => validateCardNumber());
          data_cc_digits_input_one.addEventListener('blur', (data_cc_digits_input_one) => {
           detectCardType(data_cc_digits_input_one);
          })
          
          const data_cc_digits_input_two = document.querySelector('[data-cc-info] input:first-child');
          data_cc_digits_input_two.addEventListener('blur', (data_cc_digits_input_two) => {
            validateCardHolderName(data_cc_digits_input_two);
          })
          
          data_cc_digits_input_three.addEventListener('blur', (data_cc_digits_input_three) => {
            validateCardExpiryDate(data_cc_digits_input_three)
          })
          
          data_cc_digits_input_one.focus();
          
        }

      
      
      const displayCartTotal = ({ results } ) => {
          const data_bill = document.querySelector('[data-bill]');
          const [data] = results;
          const { buyerCountry, itemsInCart } = data;
          appState.items = itemsInCart;
          appState.country = buyerCountry;
        	appState.bill =  itemsInCart.reduce((sum, i) => {
             return sum + (i.price * i.qty);
            },0)
          	
          appState.billFormatted = formatAsMoney(appState.bill, appState.country);
          data_bill.textContent = appState.billFormatted;
          uiCanInteract();
         
      
        }
      
      const fetchBill = () => {
        const api = "https://randomapi.com/api/006b08a801d82d0c9824dcfdfdfa3b3c";
        fetch(api)
        .then(response => response.json())
        .then(data => displayCartTotal(data))
        .catch(error => console.log(error));
      };
      
      const startApp = () => {
        fetchBill();
      };
	  startApp();
    </script>
  </body>
</html>