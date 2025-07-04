# ============================================================================
# DEXTERITY ROBOT TESTS
# ============================================================================
#
# Run this robot test stand-alone:
#
#  $ bin/test -s deporeibar.addon -t test_mendia.robot --all
#
# Run this robot test with robot server (which is faster):
#
# 1) Start robot server:
#
# $ bin/robot-server --reload-path src deporeibar.addon.testing.DEPOREIBAR_ADDON_ACCEPTANCE_TESTING
#
# 2) Run robot tests:
#
# $ bin/robot /src/deporeibar/addon/tests/robot/test_mendia.robot
#
# See the http://docs.plone.org for further details (search for robot
# framework).
#
# ============================================================================

*** Settings *****************************************************************

Resource  plone/app/robotframework/selenium.robot
Resource  plone/app/robotframework/keywords.robot

Library  Remote  ${PLONE_URL}/RobotRemote

Test Setup  Open test browser
Test Teardown  Close all browsers


*** Test Cases ***************************************************************

Scenario: As a site administrator I can add a Mendia
  Given a logged-in site administrator
    and an add Mendia form
   When I type 'My Mendia' into the title field
    and I submit the form
   Then a Mendia with the title 'My Mendia' has been created

Scenario: As a site administrator I can view a Mendia
  Given a logged-in site administrator
    and a Mendia 'My Mendia'
   When I go to the Mendia view
   Then I can see the Mendia title 'My Mendia'


*** Keywords *****************************************************************

# --- Given ------------------------------------------------------------------

a logged-in site administrator
  Enable autologin as  Site Administrator

an add Mendia form
  Go To  ${PLONE_URL}/++add++Mendia

a Mendia 'My Mendia'
  Create content  type=Mendia  id=my-mendia  title=My Mendia

# --- WHEN -------------------------------------------------------------------

I type '${title}' into the title field
  Input Text  name=form.widgets.IBasic.title  ${title}

I submit the form
  Click Button  Save

I go to the Mendia view
  Go To  ${PLONE_URL}/my-mendia
  Wait until page contains  Site Map


# --- THEN -------------------------------------------------------------------

a Mendia with the title '${title}' has been created
  Wait until page contains  Site Map
  Page should contain  ${title}
  Page should contain  Item created

I can see the Mendia title '${title}'
  Wait until page contains  Site Map
  Page should contain  ${title}
