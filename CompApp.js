$(".ans").click(function()
{
    if (this.classList[2] === "suc-btn") 
    {  
        $(".first").addClass("active");
    }
    else
    {
        console.log("Declined");
    }
})