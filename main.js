// File: script.js (Bản cập nhật cuối cùng cho toàn bộ dự án)

$(document).ready(function() {

    // =======================================================
    // LOGIC CHO BỘ LỌC SỰ KIỆN (TRANG EVENTS.HTML)
    // =======================================================
    function filterEvents() {
        let category = $('#filter-category').val();
        let city = $('#filter-city').val();
        let keyword = $('#filter-keyword').val().toLowerCase();
        let resultsFound = 0;

        $('.event-card').each(function() {
            let cardCategory = $(this).data('category');
            let cardCity = $(this).data('city');
            let cardTitle = $(this).find('.card-title').text().toLowerCase();

            let categoryMatch = (category === 'all' || cardCategory === category);
            let cityMatch = (city === 'all' || cardCity === city);
            let keywordMatch = (cardTitle.includes(keyword));

            if (categoryMatch && cityMatch && keywordMatch) {
                $(this).fadeIn();
                resultsFound++;
            } else {
                $(this).fadeOut();
            }
        });
        
        if (resultsFound === 0) {
            $('#no-results').show();
        } else {
            $('#no-results').hide();
        }
    }
    // Gắn sự kiện lọc chỉ khi các phần tử lọc tồn tại trên trang
    if ($('#event-filter-bar').length) {
        $('#filter-category, #filter-city').on('change', filterEvents);
        $('#filter-keyword').on('keyup', filterEvents);
    }


    // =======================================================
    // LOGIC CHO VALIDATE FORM LIÊN HỆ (TRANG CONTACT.HTML)
    // =======================================================
    $('#contact-form').on('submit', function(event) {
        event.preventDefault();

        let isValid = true;
        $('.form-control').removeClass('is-invalid');

        let name = $('#name').val().trim();
        if (name === '') {
            $('#name').addClass('is-invalid');
            isValid = false;
        }

        let email = $('#email').val().trim();
        let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email === '' || !emailRegex.test(email)) {
            $('#email').addClass('is-invalid');
            isValid = false;
        }
        
        let message = $('#message').val().trim();
        if (message === '') {
            $('#message').addClass('is-invalid');
            isValid = false;
        }

        if (isValid) {
            $('#contact-form-container').hide();
            $('#success-message').fadeIn();
        }
    });


    // =======================================================
    // LOGIC CẬP NHẬT NỘI DUNG CHO CÁC MODAL
    // =======================================================

    // 1. Modal Chi Tiết Sự Kiện (Trang events.html)
    $('.event-detail-btn').on('click', function() {
        var eventTitle = $(this).data('event-title');
        var eventImg = $(this).data('event-img');
        var eventLocation = $(this).data('event-location');
        var eventDescription = $(this).data('event-description');

        $('#modalEventTitle').text(eventTitle);
        $('#modalEventImg').attr('src', eventImg);
        $('#modalEventLocation').text(eventLocation);
        $('#modalEventDescription').text(eventDescription);
    });

    // 2. Modal Chi Tiết Địa Điểm (Trang places.html)
    $('.place-detail-btn').on('click', function() {
        var placeTitle = $(this).data('place-title');
        var placeImg = $(this).data('place-img');
        var placeDescription = $(this).data('place-description');

        $('#modalPlaceTitle').text(placeTitle);
        $('#modalPlaceImg').attr('src', placeImg);
        $('#modalPlaceDescription').text(placeDescription);
    });

    // 3. Modal Chi Tiết Món Ăn (Trang food.html)
    $('.food-detail-btn').on('click', function() {
        var foodTitle = $(this).data('food-title');
        var foodImg = $(this).data('food-img');
        var foodSuggestion = $(this).data('food-suggestion');

        $('#modalFoodTitle').text(foodTitle);
        $('#modalFoodImg').attr('src', foodImg);
        $('#modalFoodSuggestion').text(foodSuggestion);
    });

    function filterPlaces() {
        let region = $('#filter-place-region').val();
        let type = $('#filter-place-type').val();
        
        $('.place-card').each(function() {
            let cardRegion = $(this).data('region');
            let cardType = $(this).data('type');
            
            let regionMatch = (region === 'all' || cardRegion === region);
            let typeMatch = (type === 'all' || cardType === type);

            if (regionMatch && typeMatch) {
                $(this).fadeIn();
            } else {
                $(this).fadeOut();
            }
        });
    }
    if ($('#place-filter-bar').length) {
        $('#filter-place-region, #filter-place-type').on('change', filterPlaces);
    }

    function filterFoods() {
        let region = $('#filter-food-region').val();
        let type = $('#filter-food-type').val();

        $('.food-card').each(function() {
            let cardRegion = $(this).data('region');
            let cardType = $(this).data('type');

            let regionMatch = (region === 'all' || cardRegion === region);
            let typeMatch = (type === 'all' || cardType === type);

            if (regionMatch && typeMatch) {
                $(this).fadeIn();
            } else {
                $(this).fadeOut();
            }
        });
    }
    if ($('#food-filter-bar').length) {
        $('#filter-food-region, #filter-food-type').on('change', filterFoods);
    }
});