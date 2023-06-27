{
    $('a[href^="/friends"]').click((e)=>{
        e.preventDefault();

        $.ajax({
            type : 'get',
            url : e.target.href,
            success : function(data){
                console.log(data);
                if(data.friendRemoved){
                    e.target.innerHTML = 'Add Friend'
                }
                else{
                    e.target.innerHTML = 'Remove Friend'
                }
            },
            error : function(err){
                console.log(err.responseText);
            }
        })
    })
}