


  
  scrape = () => {
          
          $('#scrape').on('click', function(event){
            $.get('/scrape') 


        });

        }

        

        // var notes = {
        //   openNotes = () => {
        //     $('#open-notes').on('click', function(event){
        //       alert('Notes opened')
        //     })
        //   }


        // }



      let headlineId;

      saveArticle = () => {
        $(document).on('click', '#savebtn', function(event){
          headlineId =  $(this).attr('data-articleId')
          console.log('article saved')
          $.post("/save", {_id: headlineId}, function(response) {

          })
        })
      }

        openNotes = () => {
          $(document).on('click', '#open-notes', function(event){
            headlineId = $(this).attr('data-articleId')
            console.log(headlineId)
            console.log('Notes opened')
          })
        }

        addNote = () => {
          $(document).on('click', '#addnote', function(event){
            console.log('note added')
            console.log(headlineId)

           var addedNote =  $('#message-text').val()
           console.log(addedNote)
             // build out this route
           $.post('/addNote', {_id: headlineId , note : addedNote}, function(response) {
             console.log('hit')
          })

          })
        }

     