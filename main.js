fetch('./annunci.json').then( response => response.json() ).then( data =>{
  

    

    function setCategoryFilters(){
        let categories = Array.from(new Set(data.map(el => el.category )));
        let radioWrapper = document.querySelector('#radioWrapper');
        categories.forEach(category => {
            let div = document.createElement('div');
            div.classList.add('form-check');
            div.innerHTML= `
            
                <input class="form-check-input" type="radio" name="categories" id="${category}">
                <label class="form-check-label" for="${category}">
                ${category}
                </label>
            
            `
            radioWrapper.appendChild(div);
        })
    }

    setCategoryFilters()

    function truncateString(str){

        if(str.length > 15){
            return str.split(' ')[0] + ' ...'
        } else{
            return str
        }

    }


    function showCards(array){

        let cardsWrapper = document.querySelector('#cardsWrapper');
        cardsWrapper.innerHTML = '';

        array.sort((a,b) => Number(a.price) - Number(b.price))

        array.forEach(annuncio => {
            let div = document.createElement('div');
            div.classList.add('cards')
            div.innerHTML=`
            <li class="cards__item">
            <div class="card">
                <div class="img-fluid"><img src="./media/img vest/b140283a63ee77a12af131b53118ba18.jpg" alt=""></div>
                <div class="card__content">
                <div class="card__title">${annuncio.name}</div>
                <p class="card__text">${annuncio.category}</p>
                <button class="btn btn--block card__btn">${annuncio.price}$</button>
                </div>
            </div>
            </li>
            `
            cardsWrapper.appendChild(div)

            let titles = document.querySelectorAll('.test-title');
            titles.forEach((titolo, i) => {

                titolo.addEventListener('mouseenter' , ()=>{
                    titolo.innerHTML = `${array[i].name}`
                })

                titolo.addEventListener('mouseleave' , ()=>{
                    titolo.innerHTML = `${truncateString(array[i].name)}`
                })

            })


        })

    }


    showCards(data);


    function filterByCategory(array){
        let categoria = Array.from(radioButtons).find(bottone => bottone.checked).id
        if(categoria == 'All'){
            return array
        } else{
            let filtered = array.filter(element => element.category == categoria);
            return filtered;
        }
    }

    


    


    function priceRange(){
        let maxPrice = data.map(el => Number(el.price)).sort( (a,b) => a - b ).pop();
        rangeInput.setAttribute('max' ,Math.ceil(maxPrice) );
        rangeInput.value = rangeInput.max;
        let inputValue = document.querySelector('#inputValue');
        rangeInput.addEventListener('input' , ()=> {
            inputValue.innerHTML = `${rangeInput.value} euro`
        })
        
    }


    let rangeInput = document.querySelector('#rangeInput');
    priceRange()


    function filterByPrice(array){ 
            let filtered = array.filter(el => Number(el.price) <= rangeInput.value )
            return filtered;
    }


    

    function filterByWord(array){
            let filtered = array.filter(el => el.name.toLowerCase().includes(wordInput.value.toLowerCase()))
            return filtered;
    }

    
    function globalFilter(){
        let filteredByCategory = filterByCategory(data);
        let filteredByPrice = filterByPrice(filteredByCategory);
        let filteredByWord = filterByWord(filteredByPrice);

        showCards(filteredByWord);
    }

 

    let radioButtons = document.querySelectorAll('.form-check-input');
    let wordInput = document.querySelector('#wordInput');

   

    radioButtons.forEach(button =>{
        button.addEventListener('click', ()=>{
           globalFilter()

        })
    })

    rangeInput.addEventListener('input' , ()=>{
        globalFilter()
    })

    wordInput.addEventListener('input' , ()=>{
        globalFilter()
    })


})
