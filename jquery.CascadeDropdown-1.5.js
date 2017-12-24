//var options = {
//fields : SPJSUtility Fields holder, -> fields
//targetfield : Internal Name Field that you want to filter -> Detail
//targetList : "Guid of List that you want to fill filtered dropdown -> {6A47B3B7-27C5-4E45-89E3-5F4A76B1EF09}
//targetDisplay : Internal Name Field In target List that you to show is text in Filtered Dropdown  -> Title
//sourceField1 : Internal Name Field that you want to filter by Parent1
//parentInTargetField1 :Internal Name Field in target list that you want to filter by -> Parent1
//defaultValue1 : Default value of sourceField1 for first load  -> 11
//sourceField2 : Internal Name Field that you want to filter by -> Parent2
//parentInTargetField2 :Internal Name Field in target list that you want to filter by -> Parent2
//defaultValue2 : Default value of sourceField2 for first load -> 10
//sourceField3 : Internal Name Field that you want to filter by -> Parent3
//parentInTargetField3 :Internal Name Field in target list that you want to filter by -> Parent3
//defaultValue3 : Default value of sourceField2 for first load -> 10
//filterQuery : Additional query needs to be applied -> EnType eq 'Active' and Status eq 'Aproved'
//loadCallback : notify working context that the process of cascading is finished -> function () {}
//itemValidCallback: get custom validation for each item and you can omit item by your custom rule validation -> function(id){return false; }
//resetResult :  in multiple lookup you can sperate result box from candidate when item must be reset -> false 
//itemCountChangeCallback : in multiple lookup you get number of selected items ->function(count){ }
//andOr :

//}

function cascadeDropDownSP(options) {
    if (options.andOr == null)
        options.andOr = "And";
    if (options.resetResult == null)
        options.resetResult = true;
    var isMulti = false;
    var multiInput;
    var removeButton;
    var addButton;
    var targetDrp = $(options.fields[options.targetfield]).find('select');
    var targetDrp2;
    $(options.fields[options.targetfield]).attr('FieldType')
    if ($(options.fields[options.targetfield]).attr('FieldType') == "SPFieldLookupMulti")
    {
        isMulti = true;
        
        targetDrp = $(options.fields[options.targetfield]).find('select[id$="SelectCandidate"]');
        targetDrp2 = $(options.fields[options.targetfield]).find('select[id$="SelectResult"]');
        multiInput = $(options.fields[options.targetfield]).find('input[id$="_MultiLookup_data"]');
        multiInput.val("");
        //debugger;
        //debugger;
        removeButton = $(options.fields[options.targetfield]).find('input[id$="RemoveButton"]');
        var newremoveButton = jQuery('<input>',
            {
                disabled: "",
                'class': "ms-ButtonHeightWidth",
                type :"button",
                id: removeButton[0].id + "2",
                value: removeButton[0].value
            });
        removeButton.hide();
        newremoveButton.click(function () { removeButtonClicked($(options.fields[options.targetfield]), options.itemCountChangeCallback); })
        removeButton.after(newremoveButton);
        removeButton = newremoveButton;
        addButton = $(options.fields[options.targetfield]).find('input[id$="AddButton"]');
        var newaddButton = jQuery('<input>',
            {
                disabled: "",
                'class': "ms-ButtonHeightWidth",
                type: "button",
                id: addButton[0].id + "2",
                value: addButton[0].value
            });
        addButton.hide();
        newaddButton.click(function () { addButtonClicked($(options.fields[options.targetfield]), options.itemCountChangeCallback); })
        addButton.after(newaddButton);
        addButton = newaddButton;
       
        var newSelectCandidate = jQuery("<select>",
            {
                title: targetDrp[0].title,
                id: targetDrp[0].id + "2",
                style: targetDrp[0].style.cssText,
                multiple : "multiple"

            });
        targetDrp.hide();
        targetDrp.after(newSelectCandidate);
        targetDrp = newSelectCandidate;
        targetDrp.dblclick(function () { addButtonClicked($(options.fields[options.targetfield]), options.itemCountChangeCallback); });
        targetDrp.focus(function () {
            removeButton.attr("disabled", "");
            addButton.removeAttr("disabled");
        })
        var newSelectResult = jQuery("<select>",
           {
               title: targetDrp2[0].title,
               id: targetDrp2[0].id + "2",
               style: targetDrp2[0].style.cssText,
               multiple: "multiple"

           });
        
        targetDrp2.hide();
        targetDrp2.after(newSelectResult);
        targetDrp2.find("option").each(function () {
            newSelectResult.append(jQuery("<option>",{value : $(this).val(),text : $(this).text()}));
        })
        targetDrp2 = newSelectResult;
        targetDrp2.dblclick(function () { removeButtonClicked($(options.fields[options.targetfield]), options.itemCountChangeCallback); });
        targetDrp2.focus(function () {
            addButton.attr("disabled", "");
            removeButton.removeAttr("disabled");
        })
    }
    var sourceDrp1 = $(options.fields[options.sourceField1]).find('select');
    var sourceDrp2 = null;
    if (options.sourceField2 != null)
        sourceDrp2 = $(options.fields[options.sourceField2]).find('select');
    var sourceDrp3 = null;
    if (options.sourceField3 != null)
        sourceDrp3 = $(options.fields[options.sourceField3]).find('select');
    targetDrp.find('option[value!="0"]').remove();
    var clientContext = null;
    var oWebsite = null;
    var oList = null;
    //debugger;
    var loadValue =
        function (selectedValue1, selectedValue2, selectedValue3) {
           // debugger;
            targetDrp.find('option[value!="0"]').remove();
            if (options.resetResult && targetDrp2 != null)
            {
                targetDrp2.find('option[value!="0"]').remove();
                $(options.fields[options.targetfield]).find('select[id$="SelectResult"]').find('option[value!="0"]').remove();
                evaluateMultiLookupHiddenField($(options.fields[options.targetfield]),targetDrp2)
                if (options.itemCountChangeCallback != null)
                    options.itemCountChangeCallback(count);

            }
            var filter = "";
            if (sourceDrp3 != null)
            {
                if (selectedValue3 != null && selectedValue3 != "" && selectedValue3 != "0")
                    filter += options.parentInTargetField3 + "/Id eq " + selectedValue3
            }
            if (sourceDrp2 != null) {
                if (selectedValue2 != null && selectedValue2 != "" && selectedValue2 != "0") {
                    if (filter.length > 0)
                        filter += " "+options.andOr.toLowerCase()+" ";
                    filter += options.parentInTargetField2 + "/Id eq " + selectedValue2
                }
            }
            if (sourceDrp1 != null) {
                if (selectedValue1 != null && selectedValue1 != "" && selectedValue1 != "0") {
                    if (filter.length > 0)
                        filter += " " + options.andOr.toLowerCase() + " ";;
                    filter += options.parentInTargetField1 + "/Id eq " + selectedValue1
                }
            }
            if (options.filterQuery != null && options.filterQuery != "")
            {
                if (filter.length > 0)
                    filter += " " + options.andOr.toLowerCase()+ " ";;
                filter += options.filterQuery;

            }

            
            
            if ($('#' + options.targetfield + 'waiting').length == 0)
                targetDrp.after('<img src="/_layouts/PsaListSearchWebPart/images/waiting.gif" id="' + options.targetfield + 'waiting" style="width:10px;height:10px"');
            
             $('#' + options.targetfield + 'waiting').show();
            if (filter.length > 0) {
                loadODataRestRequest(options.targetList, "$select=Id," + options.targetDisplay + "&$filter=" + filter,
                    function (data) {
                        var multiInputValue = "";
                        //debugger;
                        targetDrp.find('option[value!="0"]').remove();
                        for (var index = 0 ; index < data.d.results.length; index++)
                        {
                            var result = data.d.results[index];
                            
                            if (options.itemValidCallback != null && !options.itemValidCallback(result.Id))
                                continue;
                            if ($(options.fields[options.targetfield]).find('select[id$="SelectResult"]').find('option[value="' + result.Id + '"]').length > 0)
                                continue;
                            var item = result[options.targetDisplay];

                            if (isMulti) {
                                $(targetDrp[0]).append("<option title=\"" + item + "\" value=\"" + result.Id + "\">" + item + "</option>");
                                if (multiInputValue.length > 0)
                                    multiInputValue += "|t|t|t"
                                multiInputValue += result.Id + "|t" + item;
                            } else {
                                targetDrp.append("<option title=\"" + item + "\" value=\"" + result.Id + "\">" + item + "</option>");
                            }
                        }
                        if (isMulti) {
                            multiInput.val(multiInputValue);
                        }
                        $('#' + options.targetfield + 'waiting').hide();
                        if (options.loadCallback != null)
                            options.loadCallback();

                        
                        

                    }, function (data) {
                        $('#' + options.targetfield + 'waiting').hide();
                    });
            }


        }
    sourceDrp1.change(function () {
            var val2 = "0";
            var val3 = "0";
            if (sourceDrp2 != null)
                val2 = sourceDrp2.val();
            if (sourceDrp3 != null)
                val3 = sourceDrp3.val();

            loadValue(sourceDrp1.val(), val2,val3);
       
    });
    if (sourceDrp2 != null)
        sourceDrp2.change(function () {
            var val3 = "0";
            if (sourceDrp3 != null)
                val3 = sourceDrp3.val();
            loadValue(sourceDrp1.val(), sourceDrp2.val(),val3);
           
        });
    if (sourceDrp3 != null)
        sourceDrp3.change(function () {
            loadValue(sourceDrp1.val(), sourceDrp2.val(), sourceDrp3.val());
        });
   
    if ((options.defaultValue1 != null && options.defaultValue1 != "") || (options.defaultValue2 != null && options.defaultValue2 != "") || (options.defaultValue2 != null && options.defaultValue2 != "")) {
            if (options.defaultValue1 == null || options.defaultValue1 == "") {
                options.defaultValue1 = "0";
            }
            if (options.defaultValue2 == null || options.defaultValue2 == "") {
                options.defaultValue2 = "0";
            }
            if (options.defaultValue3 == null || options.defaultValue3 == "") {
                options.defaultValue3 = "0";
            }
           


            loadValue(options.defaultValue1, options.defaultValue2, options.defaultValue3);
           
        }
    
        var reload = function () {
            var val2 = "0";
            var val3 = "0";
            if (sourceDrp2 != null)
                val2 = sourceDrp2.val();
            if (sourceDrp3 != null)
                val3 = sourceDrp3.val();

            loadValue(sourceDrp1.val(), val2, val3);
           
        };

    return reload;
    
}
function removeButtonClicked(tr,itemCountChangeCallback)
{
    //debugger;
    var pickedItemControl = tr.find('select[id$="SelectResult"]');
    var pickedItemControl2 = tr.find('select[id$="SelectResult2"]');
    var itemConrol = tr.find('select[id$="SelectCandidate2"]');
    var itemsToRemove = [];

    for (var i = 0; i < pickedItemControl2[0].options.length; i++)
    {
        var option = pickedItemControl2[0].options[i];
        if (option.selected) {
            itemsToRemove[itemsToRemove.length] = i;
            itemConrol.append($("<option>", { value: option.value, text: option.text, title: option.text }));
            
            //$(option).remove();
        }
    }
    for (var j = itemsToRemove.length  -1 ; j >= 0; j--)
    {
        pickedItemControl[0].options.removeChild(pickedItemControl[0].options[itemsToRemove[j]]);
        pickedItemControl2[0].options.removeChild(pickedItemControl2[0].options[itemsToRemove[j]]);
    }
    var count = evaluateMultiLookupHiddenField(tr, pickedItemControl2);
    itemsToRemove = [];
    if (itemCountChangeCallback != null)
        itemCountChangeCallback(count);


}
function addButtonClicked(tr, itemCountChangeCallback) {
   // debugger;
    var pickedItemControl = tr.find('select[id$="SelectResult"]');
    var pickedItemControl2 = tr.find('select[id$="SelectResult2"]');
    var itemConrol = tr.find('select[id$="SelectCandidate2"]');
    var itemsToRemove = [];

    for (var i = 0; i < itemConrol[0].options.length; i++) {
        var option = itemConrol[0].options[i];
        if (option.selected) {
            itemsToRemove[itemsToRemove.length] = i;
            pickedItemControl.append($("<option>", { value: option.value, text: option.text, title: option.text }));
            pickedItemControl2.append($("<option>", { value: option.value, text: option.text, title: option.text }));

            //$(option).remove();
        }
    }
    for (var j = itemsToRemove.length - 1 ; j >= 0; j--) {
        itemConrol[0].options.removeChild(itemConrol[0].options[itemsToRemove[j]]);
    }

    itemsToRemove = [];
    var count = evaluateMultiLookupHiddenField(tr, pickedItemControl2);
    if (itemCountChangeCallback != null)
        itemCountChangeCallback(count);


}
function evaluateMultiLookupHiddenField(tr, itemConrol)
{
    var valueMultiLookupHiddenField = "";
    var i = 0;
    for (i = 0; i < itemConrol[0].options.length; i++) {
        var option = itemConrol[0].options[i];
        if(valueMultiLookupHiddenField.length>0)
            valueMultiLookupHiddenField += "|t"
        valueMultiLookupHiddenField +=  option.value +"|t" + option.text;
        
    }
    tr.find('input[id$="MultiLookup"]').val(valueMultiLookupHiddenField);
    return i;
}
function loadODataRestRequest(list, query, callback, errorCallback) {

    var url = "/_api/web/Lists('" + list + "')/Items?$top=1000&" + query;
    $.ajax({
        url: url,
        async : false,
        type: "GET",
        headers: {
            "accept": "application/json;odata=verbose",
        },
        success: callback,
        error: errorCallback
    });

}
