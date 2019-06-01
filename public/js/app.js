


console.log('Client side js file is loaded');

// fetch('http://localhost:3000/weather?address=khouribga').then((response) => {
//     response.json().then((data) => {
//     if(data.error)
//         console.log('error');
//     else
//     console.log(data.location);
//     console.log(data.address);
    
//     })
// })

const weatherForm = document.querySelector('Form')
const search = document.querySelector('input')
const ms1 = document.querySelector('#message-1')
const ms2 = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = search.value;
    ms1.textContent = 'Loading...'; 
    ms2.textContent = ''; 
    fetch(`/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
        if(data.error)
            ms1.textContent = data.error;
            
        else {
            ms1.textContent =  data.location;
            ms2.textContent =  data.address;
        }
    })
})
    
})
