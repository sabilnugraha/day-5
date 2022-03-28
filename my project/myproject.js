let blogs = [  ]



function addblog(event) {
     event.preventDefault()

     let title = document.getElementById('input-project').value
     let start= document.getElementById('startdate').value;
     let end= document.getElementById('enddate').value;
     let body= document.getElementById('Description').value;
     let nodeJS= document.getElementById('Node JS');
     let reactJS= document.getElementById('React JS');
     let nextJS= document.getElementById('Next JS');
     let typeScript= document.getElementById('TypeScript');
     let image= document.getElementById('input-blog-image').files[0];
     
     const y = new Date(start)
     let startYear= y.getFullYear();
     
     const x = new Date(end)
     let endyear = x.getFullYear()

     let startMonth = y.getMonth()
     let endMonth = x.getMonth()

     let durasi = endMonth - startMonth
     
     image= URL.createObjectURL(image);

     var icon = ""

     if(nodeJS.checked == true){
          icon += '<img style="width: 30px; height: 30px;"src="nodejs.png"/>'
      }
      if(reactJS.checked == true){
          icon += '<img style="width: 25px; height: 25px;"src="reactjs.png"/>'
      }
      if(nextJS.checked == true){
          icon += '<img style="width: 22px; margin-left: 2px; height: 22px;"src="next.png"/>'
      }
      if(typeScript.checked == true){
          icon += '<img style="width: 30px; height: 30px;"src="java.png"/>'
      }
     
     
     let blog = {
          title: title,
          body: body,
          image: image,
          postedAt: new Date(),
          startYear: startYear,
          durasi: durasi,
          icon: icon
          
          
           


     } 

     blogs.push(blog)
     
     renderBlog()

    
     
     
     
} 

function renderBlog() {

     document.getElementById('content').innerHTML = ''
     
     
     for(let i = 0; i < blogs.length; i++){

          document.getElementById('content').innerHTML += 
          ` 
          <div class="card m-3" style="
          width: 18rem;
          box-shadow: 1px 1px 3px;">
          <img src="${blogs[i].image}" class="card-img-top p-3" alt="...">
          <div class="card-body">
            <h5>
    <span><a href="blog-detail.html" target="_blank"
      >${blogs[i].title}</a
    > - ${blogs[i].startYear} </span>
  </h5>

  <h6>Durasi ${blogs[i].durasi} Bulan
  </h6>

            <p style="margin-top: 25px;" class="card-text">${blogs[i].body}</p>

            <div class="bottom">
              <div class="icon" style="
              margin-left:3%;">
              ${blogs[i].icon}
              </div>

          <div class="d-flex justify-content-center align-items-center mt-2" >
            <a href="#" class="btn-left me-1" style="
            width: 160px;">Edit</a>
            <a href="#" class="btn-right ms-1"
            style="
            width: 160px;"
            >Delete</a>
          </div>

          </div>
        </div>

    </div>
    `
     }
     

     
}

let month = [
     'January',
     'February',
     'Maret',
     'April',
     'Mei',
     'Juny',
     'July',
     'August',
     'September',
     'Oktober',
     'November',
     'Desember'
]

function duration() {
     let time = new Date()

     let date = time.getDate()
     let monthIndex = time.getMonth()
     let year = time.getFullYear()

     let fulltime= `${date} ${month[monthIndex]} ${year}`

     console.log(date)
     console.log(month[monthIndex])
     console.log(year)

     console.log(fulltime)
}




