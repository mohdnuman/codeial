{
    let likeforms=$('.like-form');
    for(let i of likeforms){
       $(i).submit(function(e){
            e.preventDefault();
             console.log("heyyy");
            $.ajax({
                type:'post',
                url:i.getAttribute("action"),
                data:$(i).serialize(),
                success:function(data){
                    console.log(data);
                    let likesCount = parseInt($(i).attr('data-likes'));
                    console.log(likesCount);
                    if (data.data.deleted == true){
                        likesCount -= 1;
                        
                    }else{
                        likesCount += 1;
                    }


                    $(i).attr('data-likes', likesCount);
                    $(i).find('span').html(`${likesCount}`);
                    

                },error:function(error){
                    console.log(error.responseText); 
                }
            });
        });
    }
    
}