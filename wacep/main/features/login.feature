Feature: Test Login

Just some simple sanity checks on the index page of the application
This also serves as a good test that the lettuce and selenium
stuff is all hooked up properly and running.

	Scenario: Index Page Load With Selenium
        Using selenium
        When I access the url "/accounts/login/"
        Then I fill out the login form
        Then I see the header "Welcome" 
        Finished using selenium

    Scenario: Index Page Load
        Given I am not logged in
        When I access the url "/accounts/login/"
        Then I see the header "Log In"
