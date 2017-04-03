//set global variable for real estate type
var realEstateType = "";

$(document).ready(function(){
  console.log('jq sourced');
  getRealEstate();
  addEventListeners();
});


//server calls
function getRealEstate(){
  $.ajax({
    type: 'GET',
    url: '/realestate/get',
    success: function(response){
      console.log('returned from real estate with ', response);
      var forSale = response[0];
      var rentals = response[1];
      console.log('for sale before append: ', forSale);
      appendForSale(forSale);
      appendRentals(rentals);
    }
  });
}

function postRealEstate(data){
  $.ajax({
    type: 'POST',
    url: '/realestate/post',
    data: data,
    success: function(response){
      console.log(response);
      getRealEstate();
    }
  });
}
//end server calls

//event listeners
function addEventListeners(){
  console.log('addeventlisteners');
  //event listener for modal popup buttons
  // $('.addButtons').on('click', '.toggleModal', function(){
  //   console.log('add button clicked ', $(this).text());
  //   $('.modal').modal('show');
  // });
  //end add real estate button listeners

  //modal display options
  $('#addRealEstateModal').on('show.bs.modal', function(event) {
    var button = $(event.relatedTarget);
    console.log(button.data('realestatetype'));
    realEstateType = button.data('realestatetype');
    var modal = $(this);
    console.log(realEstateType);

    if (realEstateType === 'rental'){
      modal.find('#typeOfRealEstate').text('Rental Property Listing Details');
      modal.find('.modal-body input').val(realEstateType);
    } else {
      modal.find('#typeOfRealEstate').text('Seller Listing Details');
      modal.find('.modal-body input').val(realEstateType);
    }

  });
  //end modal display options

  $('.modal-content').on('click', '#submitProperty', function(){
    console.log($('#addCity').val() + ' ' + $('#addSqFt').val() + ' ' + $('#addPrice').val() + ' ' + realEstateType);
    var data = {};
    data.city = $('#addCity').val();
    data.sqft = $('#addSqFt').val();
    data.price = $('#addPrice').val();
    data.type = realEstateType;
    realEstateType = "";
    $('#addCity').val('');
    $('#addSqFt').val('');
    $('#addPrice').val('');
    postRealEstate(data);
  });

  $('#toggleForSale').on('click', function(){
    $('.forSaleProperties').toggleClass('hidden');
  });

  $('#toggleRentals').on('click', function(){
    $('.rentalProperties').toggleClass('hidden');
  });
}
//end event listeners

function appendForSale(forSale){
  for (var j = forSale.length-1; j >= 0; j--){
    var currentProp = forSale[j];
    var cost = currentProp.cost;
    var sqft = currentProp.sqft;
    var city = currentProp.city;

      $('.forSaleProperties').append(
      // $('#forSaleProperties').children().last().append(
        '<div class="col-md-3 col-sm-4 col-xs-6 properties">' +
        '<p><span class="glyphicon glyphicon-home"></span>  ' + dynamicDescription() + '</p>' +
          '<div class="panel-group">' +
            '<div class="panel panel-primary">' +
              '<div class="panel-heading panel-heading-sm">City:</div>' +
              '<div class="panel-body panel-body-sm"><span class="glyphicon glyphicon-map-marker"></span>  ' + currentProp.city + '</div>' +
            '</div>' +
            '<div class="panel panel-success">' +
              '<div class="panel-heading panel-heading-sm">Size:</div>' +
              '<div class="panel-body panel-body-sm"><span class="glyphicon glyphicon-info-sign"></span>  ' + currentProp.sqft + ' SqFt</div>' +
            '</div>' +
            '<div class="panel panel-info">' +
              '<div class="panel-heading panel-heading-sm">Cost:</div>' +
              '<div class="panel-body panel-body-sm"><span class="glyphicon glyphicon-usd"></span>  ' + currentProp.cost + '</div>' +
            '</div>' +
          '</div>' +
          '<p class="text-center">LEARN MORE</p>' +
        '</div>');

    }
    // if (j%4===3){
    //   console.log('/row');
    // $('.test').append('row</div><div class="row">');
    //
    // }
}

function appendRentals(rentals){
  for (var j = rentals.length-1; j >= 0; j--){
    var currentProp = rentals[j];
    var rent = currentProp.rent;
    var sqft = currentProp.sqft;
    var city = currentProp.city;

      $('.rentalProperties').append(
        '<div class="col-md-3 col-sm-4 col-xs-6 properties">' +
          '<p><span class="glyphicon glyphicon-home"></span>  ' + dynamicDescription() + '</p>' +
          '<div class="panel-group">' +
            '<div class="panel panel-primary">' +
              '<div class="panel-heading panel-heading-sm">City:</div>' +
              '<div class="panel-body panel-body-sm"><span class="glyphicon glyphicon-map-marker"></span>  ' + currentProp.city + '</div>' +
            '</div>' +
            '<div class="panel panel-success">' +
              '<div class="panel-heading panel-heading-sm">Size:</div>' +
              '<div class="panel-body panel-body-sm"><span class="glyphicon glyphicon-info-sign"></span>  ' + currentProp.sqft + ' SqFt</div>' +
            '</div>' +
            '<div class="panel panel-info">' +
              '<div class="panel-heading panel-heading-sm">Rent:</div>' +
              '<div class="panel-body panel-body-sm"><span class="glyphicon glyphicon-usd"></span>  ' + currentProp.rent + '</div>' +
            '</div>' +
          '</div>' +
          '<p class="text-center">LEARN MORE</p>' +
        '</div>');

    // }
    // if (j%4===3){
    //   console.log('/row');
    // $('.test').append('row</div><div class="row">');
    //
    // }
  }
}



  function dynamicDescription(){
    var descAdjective = ["Shiny","Churchy","Robust","Stinky","Dilapitated","Musky","Majestic","Newish","Antique","Grandiose","Gentle","Humble","Dirty","Possessed","Tarnished","Haunted","Quaint","Sketchy","Technically Habitable"];
    var descNoun = ["Abode","Rambler","Double Wide","Mansion","Dwelling","Home","Apartment","Tent","Grow House","Tiny Home","Cabana","Hut","Hideout","House Boat","Unit","Living Space","Trap House","Cottage","Lodging","Squat"];
    var luckyNumberA = Math.floor(Math.random() * descAdjective.length);
    var luckyNumberN = Math.floor(Math.random() * descNoun.length);
    return(descAdjective[luckyNumberA] + ' ' + descNoun[luckyNumberN]);
  }
