


  
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


      unsaveArticle = () => {
        $(document).on('click', '#unsavebtn', function(event){
          headlineId =  $(this).attr('data-articleId')
          console.log('article removed from saved')
          $.post("/unsave", {_id: headlineId}, function(response) {

          })
        })
      }

   

        openNotes = () => {
          $(document).on('click', '#open-notes', function(event){
            headlineId = $(this).attr('data-articleId')
            console.log(headlineId)
            
             $.post('/populated',{_id: headlineId}, function(response){
           let  notes = response[0].notes          
              console.log('response' , notes)
              for(var i =0; i < notes.length; i++){
                console.log('note' + i + ' : ' + notes[i].body)
                $(".note-section" )
                .append(`<h6 class = notes> ${notes[i].body} 
                </h6> <button type='button' class= 'deletenote btn btn-danger' data-noteId = ${notes[i]._id}> Delete Note </button>`);
              
              }

           
        })
          })
        }



        deleteNote = () => {
          $(document).on('click', '.deletenote', function(event){
           
            noteId  = $(this).attr('data-noteId')
            console.log(noteId)

            $.post('/deletenote', {_id : noteId}, function(response) {
              console.log('del hit')
            })
          })
        }

      

        addNote = () => {
          $(document).on('click', '.close-notes', function(event){
            $('.note-section').empty()
          })

          $(document).on('click', '#addnote', function(event){
            console.log('note added')

            console.log(headlineId)
              
           var addedNote =  $('#message-text').val()
           console.log(addedNote)
            $('#message-text').val('')
     
           $.post('/addNote', {_id: headlineId , note : addedNote}, function(response) {
             console.log('hit')
          })
             
          })
        }

      

      // function getNotes() {
      //   $.get('/populated', {_id: headlineId}, function(response){
      //     console.log('response' , response)
      //   })
      // }
     