# Getting Started

1. `git clone` this repo
2. `npm install`
3. enjoy!



KitHub  PSEUDOCODE


SIGN IN SCREEN
displays conditionally on "loggedIN: false" state
shows logo, description, username field, password field. Firebase authentication

FRONT PAGE
Displays default. short home page with graphic and description of site usability.

SEARCH PAGE

axios api call to makeup API. searches -- based on product type. displays products below, search bar stays
on top. overflow: scroll? does page height expand??

WISHLIST

displays user's list  -- function .filter() all items in user's kit and displays "wishlist:true".
react route and subroute based on category. as items will be uniform size and shape (though not height) , can easily use floats (ask about css multi-column layout).

KIT

displays users owned products. same as wishlist. sort subroutes and masonry layout.

COMPONENTS

- Sign-in page
div containign content and form element, onChange inputs data into the form, onSubmit sends info to Google Auth.

- header and nav bar -- displayed on every page. Nav bar changes on active.

- home screen, displays as default.

- search page, contains search form and possible radio buttons. HOWEVER if we are only searching by product TYPE, it probably makes sense to just have buttons to click for each major category to prevent
too much error handling vis a vis misspellings and invalid search terms. can use subrouting or conditional rendering to show multiple categories and api calls for each.

- wishlist route, displays wishlist container page

- kit route, displays kit container page

- both wishlist and route have a subheader to route products by category

- product component, writes information from axios call onto a small tile that itself gets displayed in its container when kit or wishlist values === true.

-- footer simple component.

