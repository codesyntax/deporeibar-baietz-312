# ============================================================================
# DEXTERITY ROBOT TESTS
# ============================================================================
#
# Run this robot test stand-alone:
#
#  $ bin/test -s deporeibar.addon -t test_igoera.robot --all
#
# Run this robot test with robot server (which is faster):
#
# 1) Start robot server:
#
# $ bin/robot-server --reload-path src deporeibar.addon.testing.DEPOREIBAR_ADDON_ACCEPTANCE_TESTING
#
# 2) Run robot tests:
#
# $ bin/robot /src/deporeibar/addon/tests/robot/test_igoera.robot
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

Scenario: As a site administrator I can add a Igoera
  Given a logged-in site administrator
    and an add Igoera form
   When I type 'My Igoera' into the title field
    and I submit the form
   Then a Igoera with the title 'My Igoera' has been created

Scenario: As a site administrator I can view a Igoera
  Given a logged-in site administrator
    and a Igoera 'My Igoera'
   When I go to the Igoera view
   Then I can see the Igoera title 'My Igoera'


*** Keywords *****************************************************************

# --- Given ------------------------------------------------------------------

a logged-in site administrator
  Enable autologin as  Site Administrator

an add Igoera form
  Go To  ${PLONE_URL}/++add++Igoera

a Igoera 'My Igoera'
  Create content  type=Igoera  id=my-igoera  title=My Igoera

# --- WHEN -------------------------------------------------------------------

I type '${title}' into the title field
  Input Text  name=form.widgets.IBasic.title  ${title}

I submit the form
  Click Button  Save

I go to the Igoera view
  Go To  ${PLONE_URL}/my-igoera
  Wait until page contains  Site Map


# --- THEN -------------------------------------------------------------------

a Igoera with the title '${title}' has been created
  Wait until page contains  Site Map
  Page should contain  ${title}
  Page should contain  Item created

I can see the Igoera title '${title}'
  Wait until page contains  Site Map
  Page should contain  ${title}
