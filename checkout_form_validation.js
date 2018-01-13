// JavaScript Document
function validateForm()
{
	var form = document.checkoutform;
	
	if(form.budjet.value=="")
	{
		alert("please Enter your Budjet");
			form.budjet.focus();
			return false;
	}
	if(isNaN(form.budjet.value)==true)
	{
	alert("Budjet must be numeric");
	    form.budjet.focus();
		form.budjet.value="";
		return false;
    }
	if(form.quote.value=="")
	{
		alert("please enter the Quote");
		    form.quote.focus();
			return false;
	}
	if(form.name.value=="")
	{
		alert("please enter your name");
		form.name.focus();
		return false;
	}
	if(form.email=="")
	{
		alert("please Enter your E-mail ID!");
			form.email.focus();
			return false;
	}
	if (!form.email.value.match(/^[\w\.\-]+@([\w\-]+\.)+[a-zA-Z]+$/))
		{
			alert("Please enter a valid E-mail ID!");
			form.email.focus();
			form.email.value="";
			return false;
		}
	if(form.Telephone.value=="")
	{
		alert("Please Enter Your Telephone") ;
		form.Telephone.focus() ;
		return false;
	}
	if(isNaN(form.Telephone.value)==true)
	{
	alert("Telephone must be numeric");
	    form.Telephone.focus();
		form.Telephone.value="";
		return false;
    }
	if(form.type.value=="")
	{
		alert("Please select the subject");
			form.type.focus();
			return false;
	}
	if(form.other.value=="")
	{
		alert("Please specify the other place");
			form.other.focus();
			return false;
	}
		return;
}
function validateForm2()
{
	var form = document.checkoutform;
}
