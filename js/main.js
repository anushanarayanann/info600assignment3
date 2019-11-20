var dateNow = new Date($.now());
var newDate = dateNow.getHours() + ":" + dateNow.getMinutes();	
			
$(function() {
	
			$("#addBtn").click(function(event){
				var fullName = document.getElementById('fullName').value
				var major = document.getElementById('major').value
				var startYear = document.getElementById('startYear').value
				if (startYear < 2000) {
					window.alert('Incorrect year: ' + startYear)
					return
				}
				var newRecord = {fullName: fullName,major: major,startYear: startYear}
				document.getElementById('inputs').reset()
				var newData = $.post( "/user/", newRecord, function() {
					
					window.alert('Record added successfully ')
				})
				.always(function() {
						loadData();
					});
            });
			
			loadData = function(event){
               $.getJSON('/users', function(data) {
				   $('#enteredRecords').empty();
				   enteredRec = document.getElementById('enteredRecords');
				   $.each(data.records, function(index, value) {
					newEntry = newDate + ' - ' + value.fullName + ', ' + value.major + ', ' + value.startYear
					newRecord = document.createElement('ul')
					newRecord.id = value.id;
					newRecord.appendChild(document.createTextNode(newEntry))
					deleteBtn = document.createElement('button');
					deleteBtn.appendChild(document.createTextNode('delete'))
					deleteBtn.addEventListener('click', function(){
					deleteRecord(value.id);
						})
					newRecord.appendChild(deleteBtn)
					enteredRec.appendChild(newRecord);
					});
						
					});
            };
			$("#loadBtn").click(loadData);
			
			deleteRecord = function(id){
				var newData = $.post( "/user/" + id, function(response) {
				loadData();
				
			});}
			
         }); 