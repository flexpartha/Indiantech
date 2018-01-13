// JavaScript Document
function validateForm()
{
	var form=document.contactform;
	if(form.name.value=="")
	{
		alert("Please Enter Your Name");
			form.name.focus();
			return false;
	}
	if(form.email=="")
	{
		alert("Please Enter your Email ID!");
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
	if(form.phone.value=="")
	{
		alert("Please Enter Your Phone Number");
			form.phone.focus();
			return false;
	}
	if(isNaN(form.phone.value)==true)
	{
		alert("Phone Number Must be Numeric");
			form.phone.focus();
			form.phone.value="";
			return false;
	}
	if(form.type.value=="")
	{
		alert("Please Select the Subject");
			form.type.focus();
			return false;
	}
	if(form.description.value=="")
	{
		alert("Please Enter the Massage");
			form.description.focus();
			return false;
	}
		return;
}
/*function validateForm2()
{
	var form = document.contactform;
}*/