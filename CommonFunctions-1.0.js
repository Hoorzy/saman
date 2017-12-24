//=================================hide setting=======================================
    $(document).ready(function () {
        GetItUsers().done(function () {
            //if(usernameId!=21){
            if (usernameId == 21 || usernameId == 25 || usernameId == 22) {
                $("#ribbonBox").show()
                $("#suiteBarButtons").show()
            }
            else {
                $("#ribbonBox").hide()
                $("#suiteBarButtons").hide()

            }
        });
        function GetItUsers() {
            var userid = _spPageContextInfo.userId;
            var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/getuserbyid(" + userid + ")";
            var requestHeaders = { "accept": "application/json;odata=verbose" };
            var dfd = $.Deferred();
            $.ajax({
                url: requestUri,
                contentType: "application/json;odata=verbose",
                headers: requestHeaders,
                success: function (data, request) {
                    usernameId = data.d.Id;
                    usernameTitle = data.d.Title
                    //alert(username)
                    // return username;
                    dfd.resolve();
                },
                error: function (error) {
                    return "Error"
                    dfd.reject();
                }
            });
            return dfd;
        }
    })
//=================================================================================
Date.prototype.toISOString = function () {
//debugger;
    return this.getUTCFullYear()
      + '-' + pad(this.getUTCMonth() + 1, 2)
      + '-' + pad(this.getUTCDate(), 2)
      + 'T' + pad(this.getUTCHours(), 2)
      + ':' + pad(this.getUTCMinutes(), 2)
      + ':' + pad(this.getUTCSeconds(), 2)
      + '.' + String((this.getUTCMilliseconds() / 1000).toFixed(3)).slice(2, 5)
      + 'Z';

};
Date.prototype.addHours = function(h) {    
   this.setTime(this.getTime() + (h*60*60*1000)); 
   return this;   
}
Date.prototype.addMinutes = function(m) {    
   this.setTime(this.getTime() + (m*60*1000)); 
   return this;   
}
Date.prototype.addDays = function(d) {
     this.setTime(this.getTime() + (d*24*60*60*1000)); 
   return this;   
};
Date.prototype.toISODateString = function (h, m) {
//debugger;
    if (h == null)
        h = 0;
    if (m == null)
        m = 0
    return this.getUTCFullYear()
      + '-' + pad(this.getUTCMonth() + 1, 2)
      + '-' + pad(this.getUTCDate(), 2)
      + 'T' + pad(h,2)
      + ':' + pad(m, 2)
      + ':' + "00"
      + '.' + "000"
      + 'Z';

};
function getISODateString(y,m,d,h, min)
{
  if (h == null)
        h = 0;
    if (min == null)
        min = 0
    return y
      + '-' + pad(m, 2)
      + '-' + pad(d, 2)
      + 'T' + pad(h,2)
      + ':' + pad(min, 2)
      + ':' + "00"
      + '.' + "000"
      + 'Z';


}

function getJsDate(dateIsoFormat)
{
	var d = dateIsoFormat.split('T')[0].split('-');
	var t = dateIsoFormat.split('T')[1].split(':');

	return new Date(Number(d[0]), Number(d[1])-1, Number(d[2]),Number(t[0]),Number(t[1])).addMinutes(210);
     
}
function daysBetween(first, second) {
    var one; 
    var two;
	
	if(first[first.length-1] == "Z")
	{
		var f = first.split('T')[0].split('-');
		
		var s = second.split('T')[0].split('-');
	    one = new Date(Number(f[0]), Number(f[1]), Number(f[2]));
     
	    two = new Date(Number(s[0]), Number(s[1]), Number(s[2]));
		
	}
	else
    {
        var f = new Date(first);
        var s = new Date(second);
        // Copy date parts of the timestamps, discarding the time parts.
        one = new Date(f.getFullYear(), f.getMonth(), f.getDate());
     
        two = new Date(s.getFullYear(), s.getMonth(), s.getDate());
    }
    // Do the math.
    var millisecondsPerDay = 1000 * 60 * 60 * 24;
    var millisBetween = two.getTime() - one.getTime();
    var days = millisBetween / millisecondsPerDay;

    // Round down.
    return Math.floor(days);
}
function pad(val, len) {
    var strVal = val.toString();
    while (strVal.length < len) {
        strVal = "0" + strVal;
    }
    return strVal;

}
function gDateValue(pdate,h,m) {
    //debugger;
    var dateParts = pdate.split('/');

    var jd = $.calendars.newDate(Number(dateParts[0]), Number(dateParts[1]), Number(dateParts[2]), 'persian', 'fa');
    if(h == null)
    	return jd.toJSDate().toISODateString();
    return jd.toJSDate().toISODateString(h,m);
}
function pDateTimeValue(gdate) {
   // debugger;
    var d = gdate.split('T')[0].split('-');
    var t = gdate.split('T')[1].split(':');
    var jd = $.calendars.instance('gregorian').newDate(Number(d[0]), Number(d[1]), Number(d[2])).toJD();
    var date = $.calendars.instance('persian').fromJD(jd);
    return date.formatYear() + "/" + date.month() + "/" + date.day() + " " //+ date.calendar().regionalOptions['fa'].dayNames[date.dayOfWeek()]
    + " " + t[0]+":"+t[1];
}

// BY Ahmadi : BEGIN
function JTimeValue(gdate) {
   // debugger;
    //var d = gdate.split('T')[0].split('-');
    //var t = gdate.split('T')[1].split(':');
	var dt=new Date(gdate);
	dt=new Date(dt.getTime() + _spPageContextInfo.clientServerTimeDelta)
    var HR=dt.getHours()<10 ? '0' + dt.getHours() : dt.getHours();
    var MN=dt.getMinutes()<10 ? '0' + dt.getMinutes() : dt.getMinutes();
    return ToShamsi(dt.getFullYear(),dt.getMonth()+1,dt.getDate()) + " " + HR+":"+ MN;
}
function JDate(gdate) {
   // debugger;
    //var d = gdate.split('T')[0].split('-');
    //var t = gdate.split('T')[1].split(':');
	var dt=new Date(gdate);
	//dt=new Date(dt.getTime() + _spPageContextInfo.clientServerTimeDelta)
    return ToShamsi(dt.getFullYear(),dt.getMonth()+1,dt.getDate());
}

function currentSPDateTime() {
    return new Date(new Date().getTime() + _spPageContextInfo.clientServerTimeDelta);
}

function currentSPJDateTime() {
    var dt= new Date(new Date().getTime() + _spPageContextInfo.clientServerTimeDelta);
    var HR=dt.getHours()<10 ? '0' + dt.getHours() : dt.getHours();
    var MN=dt.getMinutes()<10 ? '0' + dt.getMinutes() : dt.getMinutes();
    return ToShamsi(dt.getFullYear(),dt.getMonth()+1,dt.getDate()) + " " + HR+":"+ MN;
}

// BY Ahmadi  : END
function pDateValue(gdate) {
    //debugger;
    var jsDate = getJsDate(gdate);
    
    //var d = gdate.split('T')[0].split('-');
   // var h = gdate.split('T')[0].split(':')[0];
    var jd = $.calendars.instance('gregorian').newDate(jsDate.getUTCFullYear(),jsDate.getUTCMonth() + 1 , jsDate.getUTCDate()).toJD();
    var date = $.calendars.instance('persian').fromJD(jd);
    return date.formatYear() + "/" + date.month() + "/" + (date.day()) + " " + date.calendar().regionalOptions['fa'].dayNames[date.dayOfWeek()];
}
function pDateTime(gdate) {
   // debugger;
    
    var jd = $.calendars.instance('gregorian').newDate(gdate.getFullYear(), gdate.getMonth() + 1,gdate.getDate()).toJD();
    var date = $.calendars.instance('persian').fromJD(jd);
    return date.formatYear()  + pad(date.month(),2)  + pad(date.day(),2) ;
}

function pDateValueShort(gdate,offset) {
   // debugger;
    var d = gdate.split('T')[0].split('-');
    var jd = $.calendars.instance('gregorian').newDate(Number(d[0]), Number(d[1]), Number(d[2])).toJD();
    var date = $.calendars.instance('persian').fromJD(jd);
    if(offset != null)
    date.add(offset,'d');
    return date.formatYear() + "/" + pad(date.month(),2) + "/" + pad(date.day(),2);
}

function loadQueryRequest(list, callback, query)
{
    var loadAction = function () {
        var clientContext = SP.ClientContext.get_current();
        var web = clientContext.get_web();
        var oList = web.get_lists().getById(list);


        var camlQuery = new SP.CamlQuery();
        camlQuery.set_viewXml(query);
         var collListItem = oList.getItems(camlQuery);

        clientContext.load(collListItem);

        clientContext.executeQueryAsync(function () {
            var listItemEnumerator = collListItem.getEnumerator();

            while (listItemEnumerator.moveNext()) {
                var oListItem = listItemEnumerator.get_current();
                callback(oListItem);
            }

        }, function () { });
    };
    SP.SOD.executeFunc('sp.js', 'SP.ClientContext', loadAction);
}
function loadRequest(url, callback,async) {
	if(async == null)
		async = true;
    $.ajax({
        url: url,
        type: "GET",
        async : async,
        headers: {
            "accept": "application/json;odata=verbose",
        },
        success: callback,
        error: function (error) {
            alert(JSON.stringify(error));
        }
    });

}
function loadRestRequest(url, callback) {
	var async = true;
	var res = null;
	if(callback == null)
	{
		async = false;
		callback = function(data){
			res =  data.d;
		}
	}
    $.ajax({
        url: url,
        type: "GET",
        async : async,
        headers: {
            "accept": "application/json;odata=verbose",
        },
        success: callback,
        error: function (error) {
            alert(JSON.stringify(error));
        }
    });
    return res;

}

function addNewItem(url, data, successCallback, errorCallback) {
    if (successCallback == null)
        successCallback = function (data) {
            console.log(data);
        }
    if (errorCallback == null)
        errorCallback = function (error) {
            alert(JSON.stringify(error));
        }
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + url,
        async:false,
        type: "POST",
        headers: {
            "accept": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val(),
            "content-Type": "application/json;odata=verbose"
        },
        data: JSON.stringify(data),
        success: successCallback ,
        error: errorCallback
    }
    );
}
function updateItem(url, data, successCallback, errorCallback) {
    if (successCallback == null)
        successCallback = function (data) {
            console.log(data);
        }
    if(errorCallback == null)
        errorCallback = function (error) {
            alert(JSON.stringify(error));
        }
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + url,
        async:false,
        type: "POST",
        headers: {
            "accept": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val(),
            "content-Type": "application/json;odata=verbose",
            "X-HTTP-Method": "MERGE",
            "If-Match": "*"
        },
        data: JSON.stringify(data),
        success: successCallback,
        error: errorCallback
    });
}
/////////// Start: By Ahmadi ////////////
function deleteItem(url,data,successCallback, errorCallback) {
 	   if(errorCallback == null)
        errorCallback = function (error) {
            alert(JSON.stringify(error));
        }
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + url,
        async:false,
        type: "POST",
        headers: {
			    "Accept": "application/json;odata=verbose",
                "X-Http-Method": "DELETE",
                "X-RequestDigest": $("#__REQUESTDIGEST").val(),
                "If-Match": "*"
                },
        success: successCallback,
        error: errorCallback
    });
}
/////////// End: By Ahmadi ////////////
function getQueryStringValue(qname) {
    var index = location.href.toLowerCase().indexOf(qname.toLowerCase() + '=')
    if (index> -1) {
    	index = index + qname.length +1;
        var val = location.href.substring(index);
        return val.split("&")[0];
    }
    return "";
}
function getCurrentRowId(tr)
{
    return tr.attr("iid").split(',')[1].split(',')[0];
}
function getValueFromRow(tr,colunmIndex)
{
   // debugger;
    return tr.find('.ms-vb2').eq(colunmIndex).text();
}
function getLookupIdFromRow(tr, colunmIndex) {
	var TXT= tr.find('.ms-vb2').eq(colunmIndex).find('a');
	if(tr.find('.ms-vb2').eq(colunmIndex).find('a').length>0)
    return tr.find('.ms-vb2').eq(colunmIndex).find('a').attr('href').split('ID=')[1].split('&')[0];
    else return 0;
}
function getValueFromBox(wp,rowIndex)
{
   // debugger;
    return wp.find('td.ms-stylebody').eq(rowIndex).text();
}
function getLookupIdFromBox(wp, rowIndex) {
    return wp.find('td.ms-stylebody').eq(rowIndex).find('a').attr('href').split('ID=')[1].split('&')[0];
}

function dialogOpener(url, title, dialogResultCallback, width, height) {
    if (url.length < 2)
        return;
    var Option = {
        url: url,
        allowMaximize : false
    };

    if (width != null)
        Option.width = width;
    if (height != null)
        Option.height = height;

    if (title != null)
        Option.title = title;
    if (dialogResultCallback != null)
        Option.dialogReturnValueCallback = dialogResultCallback;

    SP.SOD.execute('sp.ui.dialog.js', 'SP.UI.ModalDialog.showModalDialog', Option);
}

function getSearchQuery() {
    return "<View><Query>" + $('input[name$="HiddenFieldQuery"]').val() + "</Query></View>";
}
////////////////////////////////
function SMSSend(MsgText, CellNumber) {
        var URL = "http://95.130.240.51/url/send?username=ertebat&password=123654789&srcaddress=982000064000";
        $.ajax({
            url: URL,
            type: "POST",
            async: true,
            data: {
                dstaddress: CellNumber,
                unicode: 1,
                body: MsgText
            },
            success: function (msg) {
                alert(msg.status);
            },
            error: function (e) {
               // alert("Failed: [" + e.status + "] " + e.statusText);
            }
        });
    }
///////////////////////edit by nazari
function setLookup(fieldTitle,lookupVal)
{
    //Set default value for lookups with less that 20 items
    if ( $("select[title='" +fieldTitle+ "']").html() !== null)
    {
       $("select[title='"+ fieldTitle +"']").val(lookupVal);

    }
    else
    {
        //get the hiddent input using the "optHid" attribute of displayed Input
        hiddenInput = $("input[title='" +fieldTitle +"']").attr("optHid");
        //set value in the hidden input
        $("input[id='" +hiddenInput +"']").attr("value",lookupVal)

        //get the string of choices from the input element so we can set displayed value
        choices = $("input[title='" +fieldTitle +"']").attr("choices");

        //turn choices string into an array so we can iterate through it
        choiceArray = choices.split("|");

        //improve performance by iterating over every other entry (just look at values)
        for (index = 1; index < choiceArray.length; index = index + 2)
        {
            if (choiceArray[index] == lookupVal){
                //set the displayed input which is the PREVIOUS entry in array
                $("input[title='" +fieldTitle +"']").val(choiceArray[index - 1]);
            }
        }
    }
}
/////////////////////start by farid
function pDateTimeYear(gdate) {
    var jd = $.calendars.instance('gregorian').newDate(gdate.getFullYear(), gdate.getMonth() + 1,gdate.getDate()).toJD();
    var date = $.calendars.instance('persian').fromJD(jd);
    return date.formatYear();
}
function pDateTimeMonth(gdate) {
    var jd = $.calendars.instance('gregorian').newDate(gdate.getFullYear(), gdate.getMonth() + 1,gdate.getDate()).toJD();
    var date = $.calendars.instance('persian').fromJD(jd);
    return  pad(date.month(),2);
}
////////////////////end by farid
//======================================================================================
function SetCurrentUser(fieldName) {
	var userid = _spPageContextInfo.userId;
	var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/getuserbyid(" + userid + ")";
	var requestHeaders = { "accept" : "application/json;odata=verbose" };
	$.ajax({
	  url : requestUri,
	  contentType : "application/json;odata=verbose",
	  headers : requestHeaders,
	  success : function (data, request) {
					var username=data.d.Title;
					//alert(username);
					setFieldValue(fieldName, username);
					//	alert(username)
					return username;
			},
	  error : function (error) {
				 return "Error"
			}
	  });
}
//======================================================================================
function GetCurrentUser() {
	var userid = _spPageContextInfo.userId;
	var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/getuserbyid(" + userid + ")";
	var requestHeaders = { "accept" : "application/json;odata=verbose" };
	$.ajax({
	  url : requestUri,
	  contentType : "application/json;odata=verbose",
	  headers : requestHeaders,
	  success : function (data, request) {
					var username=data.d.Title;
					//alert(username)
					return username;
			},
	  error : function (error) {
				 return "Error"
			}
	  });
}
