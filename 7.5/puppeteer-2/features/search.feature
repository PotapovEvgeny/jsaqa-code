Feature: Booking ticket- Tests

	Scenario: Positive - Should book one seat
		Given user is on start page "http://qamid.tmweb.ru/client/index.php"
		When user chooses day "6" of the week
		When user chooses movie "2" and time "2"
		When user chooses seat "5" and "5"
		When user click on button 'Забронировать'
		Then user sees the header 'Вы выбрали билеты'

	Scenario: Positive - Should book one seat
		Given user is on start page "http://qamid.tmweb.ru/client/index.php"
		When user chooses day "6" of the week
		When user chooses movie "2" and time "2"
		When user chooses seat "11" and "5"
		When user chooses seat "11" and "6"
		When user click on button 'Забронировать'
		Then user sees the header 'Вы выбрали билеты'

	Scenario: Negative - Should not book any seats
		Given user is on start page "http://qamid.tmweb.ru/client/index.php"
		When user chooses day "7" of the week
		When user chooses movie "2" and time "2"
		Then button 'Забронировать' not active