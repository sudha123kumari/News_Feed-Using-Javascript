
let collapseIndex = 1;

magazines.forEach(async function(element){
    let url = 'https://api.rss2json.com/v1/api.json?rss_url='+`${element}`;
    console.log(url);
    res = await fetch(url);
    res = await res.json();
    console.log("hello");
    
    collapseId = 'collapse'+ collapseIndex;
    collapseButtonId = collapseIndex + 'collapse';

    carouselId = 'carousel'+ collapseIndex;

    let accElement = document.createElement('div');
    accElement.className = 'accordion-item';
    accElement.innerHTML = 
       `<h2 class="accordion-header">
        <button id= "${collapseButtonId}" class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#${collapseId}">
        ${res.feed.title}
        </button>
        </h2>
        <div id="${collapseId}" class="accordion-collapse collapse" data-bs-parent="#newsAccordion">
        <div class="accordion-body d-flex flex-row justify-content-between w-100 py-1 px-0">
         
            <div id="${carouselId}" class="carousel slide w-100" data-bs-ride="carousel">
            <div class="carousel-inner" id = "${res.feed.title}">

            </div>
            </div>
           
            <div>
            <button class="carousel-control-next carouselButtton" type="button" data-bs-target="#${carouselId}" data-bs-slide="next">
            <span class="carousel-control-next-icon"></span>
            </button>
            <div>
            
        </div>
        </div>`;
    document.getElementById("newsAccordion").appendChild(accElement);
    

    if(collapseIndex === 1){
        document.getElementById('collapse1').className += ' show';
        document.getElementById('1collapse').className = "accordion-button";
    }
    
    collapseIndex += 1;
    // Code for carousel items
    res.items.forEach(element => {
        let dte = new Date(element.pubDate);
        dte = dte.toLocaleDateString("en-IN");
        let carouselItem = document.createElement('div');
        carouselItem.className = "carousel-item";
        carouselItem.innerHTML = `<a href = "${element.link}"><img src = "${element.enclosure.link}"  class="newsImg"></a>
        <h3 class="news-heading">${element.title}</h3>
        <div class="d-flex flex-row news-subHeading">
        <span>${element.author}</span>
        <ul> <li><span>${dte}</span></li></ul>
        </div>
        <hr>
        <p class="news-description">${element.description}</p>`;
        document.getElementById(`${res.feed.title}`).appendChild(carouselItem);
    });

    document.getElementById(`${res.feed.title}`).firstElementChild.className += ' active';
});













