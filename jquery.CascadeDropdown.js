
function cascadeDropDown(fields,sourceField, targetfield, targetList, parentInTargetField, targetDisplay,firstValue) {
    //debugger;
    var sourceDrp = $(fields[sourceField]).find('select');
    var targetDrp = $(fields[targetfield]).find('select');
    targetDrp.find('option[value!="0"]').remove();
    var clientContext = null;
    var oWebsite = null;
    var oList = null;
    
    var loadValue =
        function (selectedValue) {
            if (clientContext == null) {
                clientContext = new SP.ClientContext.get_current();
                oWebsite = clientContext.get_web();
                oList = oWebsite.get_lists().getById(targetList);
            }
            targetDrp.find('option[value!="0"]').remove();
            var camlQuery = new SP.CamlQuery();
            camlQuery.set_viewXml(
                '<View><Query><Where><Eq><FieldRef Name=\'' + parentInTargetField + '\' LookupId=\'TRUE\'/>' +
                '<Value Type=\'Integer\'>' +selectedValue+ '</Value></Eq></Where>' +
                '</Query>' +
                '</View>'
            );
            var collListItem = oList.getItems(camlQuery);
            if ($('#' + targetfield + 'waiting').length == 0)
                targetDrp.after('<img src="/_layouts/PsaListSearchWebPart/images/waiting.gif" id="' + targetfield + 'waiting" style="width:10px;height:10px"');
            else
                $('#' + targetfield + 'waiting').show();
            clientContext.load(collListItem);
            clientContext.executeQueryAsync(
                function (sender, args) {
                    var listItemEnumerator = collListItem.getEnumerator();
                    while (listItemEnumerator.moveNext()) {

                        var oListItem = listItemEnumerator.get_current();

                        var item = oListItem.get_item(targetDisplay);
			if(targetDrp.attr("multiple") != null || targetDrp.attr("multiple") == 'multiple')
				{$(targetDrp[0]).append("<option value=\"" + oListItem.get_id() + "\">" + item + "</option>");
			}else{
                        	targetDrp.append("<option value=\"" + oListItem.get_id() + "\">" + item + "</option>");
			}
                    }
                    $('#' + targetfield + 'waiting').hide();

                },
                function (sender, args) {
                    $('#' + targetfield + 'waiting').hide();
                }
            );


        }

    sourceDrp.change(function () {
        SP.SOD.executeFunc('sp.js', 'SP.ClientContext', function () {
        loadValue(sourceDrp.val());
        });
    });
    if (firstValue != null && firstValue != "") {
        SP.SOD.executeFunc('sp.js', 'SP.ClientContext', function () {
		

        loadValue(firstValue);
        });

    }

}