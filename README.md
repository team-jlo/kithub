# Getting Started

1. `git clone` this repo
2. `npm install`
3. enjoy!



KitHub  PSEUDOCODE

FRONT PAGE
Displays default. short home page with graphic and description of site usability.


SIGN IN SCREEN

displays conditionally on "loggedIN: false" state
shows logo, description, username field, password field. 
Firebase authentication

- sign in styled like makeup compact -- eyeshadow palette


SEARCH PAGE

axios api call to makeup API. searches -- based on product type. displays products below, search bar stays
on top. overflow: scroll? does page height expand??

- search page, contains search form and possible radio buttons. HOWEVER if we are only searching by product TYPE, it probably makes sense to just have buttons to click for each major category to prevent
too much error handling vis a vis misspellings and invalid search terms. can use subrouting or conditional rendering to show multiple categories and api calls for each.

- possible input field with drop-down menu 
- need way to signal to user what is and what isn't available in our API.


WISHLIST

- if not signed in, message to sign in to use that feature.

-- displays user's list  -- function .filter() all items in user's kit and displays "wishlist:true".
react route and subroute based on category. as items will be uniform size and shape (though not height) , can easily use floats.

KIT
same as wishlist.

displays users owned products. same as wishlist. sort subroutes and masonry layout.


COMPONENTS

- Sign-in page
div containing content and form element, onChange inputs data into the form, onSubmit sends info to Google Auth. Facebook (OR ANOTHER OPTION) as stretch goal.

- search component -- possible sub component that displays the results. -- passing info to subcomponent with derivedStateFromProps?

- header and nav bar -- displayed on every page. Nav bar changes on active.

- home screen, displays as default.

- wishlist route, displays wishlist container page

- kit route, displays kit container page

- both wishlist and kid have a subheader to route products by category -- stretch goal!

- product component, writes information from axios call onto a small tile that itself gets displayed in its container when kit or wishlist values === true (last part is stretch goal).

-- footer simple component. potentially secondary navigation. copyright.

