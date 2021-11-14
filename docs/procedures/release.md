# Release Process:

This entry describes the steps necessary to make a new ODOP "release".
Specifically, this is the process to publish the current development version to Heroku 
and the documentation to GitHub Pages and SpringDesignSoftware.org.

Ideally, any system downtime affecting the production system should be announced in advance via docs/About/messageOfTheDay.md

For background regarding "Major.Minor.Patch" see: [ODOP version numbering](../design/VersionNumbers)
   
Remember that if merged to master and pushed, changes to docs will be immediately published on GitHub Pages.
Until all doc references are fully switched over to SpringDesignSoftware.org,
documentation references to new features should not be merged to master 
until immediately before the version containing those features is published to Heroku production.
This will delay closing the corresponding issue covering those documentation changes. 
Once documentation references are fully switched over to SpringDesignSoftware.org,
it will be possible to merge doc updates to master but delay their publication to SpringDesignSoftware.org.  

&nbsp;

A. **DEVELOPMENT environment**

1. Verify GitHub Milestone issues are completed.  Ask:   
   "Have we done everything on our milestone list?"   
   "Is there anything else we need to do?"   
   "Are we ready for release?"   
1. Make sure your development environment is on branch master.   
1. Check for and deal with security vulnerabilities.
See GitHub Dependabot alerts.   
Issue the command:   
npm audit fix   
when positioned in the server directory and again when positioned in the client directory.
1. If this release has no migrate requirement, initialState impact or environment variable changes,
skip forward to [Test For Console Output](release#test4consoleoutput).   
To confirm,
compare the current master branch against the previous released commit tag branch 
and check if any of the client/src/designtypes/.../initialState.js files have changed.  
&nbsp;
1. If the database does not exist or is brand new and empty, then see [Procedures for creating a new JAWSDB](NewDB)
to create and format the database tables using the create.sql file. 
Do this to development, test, staging and/or production databases as appropriate.   
See Heroku Dashboard Resources tab for JAWS DB.
The database names are summarized in [Procedures for creating a new JAWSDB](NewDB).   
1. Start server and client under your development environment. 
If they are already started, log off of Okta and re-log into Okta to ensure the session is valid and not at risk of time-out.   
1. Verify initial_state and migrate match: Repeat the following steps for each design type (Piston-Cylinder, Solid, Spring/Compression, Spring/Extension, and Spring/Torsion) with an impacted initialState. 
    1. Modify File > Export to create sorted output by uncommenting sort capability.
    1. For each design type that has an impacted Initial State 
        1. Do a File > Open > Load Initial State. Run Action > Execute > mk[x] script and Exit to created each [x] file. Do a File > Export and rename into the [mk\_x] JSON file.
        1. Separately do a File > Open > Startup which should migrate it followed by a File : Export and rename into a "Migrated\_x" JSON file.
        1. Compare the two JSON files to verify that initial state and migration operate exactly the same. If they don't match then repair them until they do or the changes are as intended.
    1. When done modify File > Export to recomment out sort capability.
1. Create load.sql files: Repeat the following steps or each design type (Piston-Cylinder, Solid, Spring/Compression, Spring/Extension, and Spring/Torsion) with an impacted initialState. 
Process "Startup_Metric" designs for the three Spring design types similarly.
    1. Do a File > Open > Load Initial State for each design type that has an impacted Initial State. 
    Run Action > Execute > mk[x] script and Exit to created each [x] file. Do a File > Save into the [x] file.
    1. Using MySqlDump command run the `scripts/dump_db_startuo_files.sh` script to dump all newly created design files into their respective load.sql files. You might need to set a different OKTA Userid and also add carriage returns vefore each insetrted VALUES section.  
    1. Finally, manually edit each one and delete the 'id' field name and 'id' field value (it should be first in each list). 
Set the user field = NULL.
    1. **Commit these changes.**  The script to load these changes will be run in a [later step](release#runloadscript).  
&nbsp;
1. If there are environment variable changes, update Server's .env and Client's .env with the following for development (localhost). NOTE: No entry for Server's .env or Client's .env is needed for JS\_RUNTIME\_TARGET\_BUNDLE for development (localhost). Assume NODE_ENV="development" for software development environment, or "test" for test case execution environment.
    * JAWSDB\_URL - For server only
    * REACT\_APP\_NODE\_ENV=development|test
    * REACT\_APP\_ISSUER
    * REACT\_APP\_CLIENT\_ID
    * REACT\_APP\_DESIGN\_TYPES
    * REACT\_APP\_DESIGN\_TYPE
    * REACT\_APP\_DESIGN\_NAME
    * REACT\_APP\_DESIGN\_UNITS
    * REACT\_APP\_DESIGN\_VIEW
    * REACT\_APP\_SESSION\_REFRESH
1. Do a pull or push to get latest version on all systems.
<a id="test4consoleoutput"></a>  
&nbsp;
1. **Test For Console Output** &nbsp; Bring up Google Chrome and enable View Console / Debugger.
   Test various input and menu functions and verify no unexpected console.log output.
   Use regular expression search: "^\s*console.log" to find non-commented out console.log lines.
   Most console.log output is acceptable in client/src/store/middleware/seek.js, client/src/registerServiceWorker.js, server.js and client\public\dynoLoading.js.
1. Shutdown server and client under your development environment.  
&nbsp;
1. In server, run "npm test" and verify test cases executed successfully.
1. In client, run "npm test" and verify test cases executed successfully.  
&nbsp;
1. Update client/src/version.js file to Major.Minor.Patch (for example: 2.3.1). Remove 'dev' suffix. Optionally use 'rc1' or 'rc2'.
1. Commit with message "Update version.js to Major.Minor.Patch" and push to origin.
1. Pull to get latest version on all systems.
1. Restart server then client under your development environment.
1. Bring up on Windows under Microsoft Chromium Edge and verify Help : About Software Version is as expected (Major.Minor.Patch).
   Bring up on Windows and Mac OS X under Google Chrome and verify Help : About Software Version is as expected.

&nbsp;

B. **DO first for STAGING and then do again for PRODUCTION environments**
1. If not logged into Heroku, go to the Heroku Website and log in.
1. Use the Heroku console settings tab to check the currently configured version of the Heroku stack. 
   Upgrade the Heroku stack for the staging or production system as appropriate. 
   The change will not be final until after the next deployment.  
1. If operating on the production system (ignore for staging), check for active users on the production system; put the production system in maintenance mode.
   Maintenance mode may be enabled in the Heroku console settings tab or from the command line with:  
   heroku maintenance:on -a odop
1. If no changes to dynamic runtime configuration variables skip forward to [Database Stuff](release#databaseStuff).
&nbsp;
1. For handling dynamic runtime configuration variables in Heroku only:
   From Dashboard, expand "odop" for production or "odop-staging" for the staging system. Go to settings/Config Vars. Click "Reveal Config Vars".
   Update Heroku Configuration Variables JS\_RUNTIME\_TARGET\_BUNDLE to "/app/client/build/static/js/*.js" for staging, or production.
&nbsp;
1. Update Heroku Configuration Variables with the following for staging (odop-staging), or production (odop).
    * JAWSDB\_URL
    * NODE\_ENV="staging" -- only for staging, assume default "production" for production
    * REACT\_APP\_NODE\_ENV=production|staging -- only for staging, assume default "production" for production
    * REACT\_APP\_ISSUER
    * REACT\_APP\_CLIENT\_ID
    * REACT\_APP\_DESIGN\_TYPES
    * REACT\_APP\_DESIGN\_TYPE
    * REACT\_APP\_DESIGN\_NAME
    * REACT\_APP\_DESIGN\_UNITS
    * REACT\_APP\_DESIGN\_VIEW
    * REACT\_APP\_SESSION\_REFRESH
1. Update Heroku Buildpack for staging (odop-staging), or production (odop).
   Buildpack configuration is on Heroku Settings tab.
<a id="databaseStuff"></a>
&nbsp;
1. **Database Stuff** &nbsp; If this release has no database impact, skip forward to [Publish to Heroku](release#publish2Heroku).
1. If the database does not exist or is brand new and empty, then see [Procedures for creating a new JAWSDB](NewDB)
to create and format the database tables using the create.sql file.
Do this for staging and/or production databases as appropriate.   
See the above link for the easier-to-read table of database names.  
1. Optionally back up staging database. Back up the production database.
   For background on backup provided by JAWSDB see: [Heroku docs](https://devcenter.heroku.com/articles/jawsdb#database-backups)
1. Check the size of the production database as compared to capacity limits (5Mb for JAWSDB free plan). 
Use the ./scripts/db_size.sh script.  
For details, see the first FAQ question at: https://devcenter.heroku.com/articles/jawsdb#faq   
If appropriate, dump to off-line storage and re-initialize the log_Usage table.
<a id="runloadscript"></a>
&nbsp;
1. If the database already exists but no entries exist or must be recreated, then either
   modify the script for the particular database and
   run the configured ./scripts/load_all.sh script
   or
   manually run all affected load.sql files to create startup files for each design type in the affected database.
1. Delete any old, invalid or development-only designs if necessary.
&nbsp;
1. Do a pull or push as required to get latest version on all systems.
<a id="publish2Heroku"></a>
&nbsp;
1. **Publish to Heroku** &nbsp; If not logged into Heroku, login in using the command line "heroku login" which in turn brings up the Heroku website login page in your browser.
1. Shutdown server and client under your development environment.
&nbsp;
1. In your git/odop directory push to Heroku using the command line:   
git push heroku-staging master   
  &nbsp; or   
git push heroku master   
Verify no error messages during build on heroku.   
&nbsp;   
Note 1: This step may fail if the previous release contains patches that are not included in the new release.
You can either move those patches into the current release or issue the git push command with a --force option.   
Note 2: to push a non-master branch, confirm that is the current branch with:   
git status   
   &nbsp; then   
git push heroku[-staging] +HEAD:master   
&nbsp;   
1. If maintenance mode was previously enabled, disable maintenance mode:  
heroku maintenance:off -a odop
1. Confirm that the http://odop-staging.herokuapp.com or http://odop.herokuapp.com website is operational and that version Major.Minor.Patch displays.
1. Update docs/About/messageOfTheDay.md to announce availability of the new version.
1. **Publish to SpringDesignSoftware.org**. &nbsp; For production only, 
while positioned in the git/odop directory, push to SpringDesignSoftware.org using the command line:   
git push springdesignsoftware master   
Verify no unexpected error messages during build on production.
1. Confirm that the http://SpringDesignSoftware.org/odop/docs website is operational and that documentation displays.

&nbsp;

C. **DEVELOPMENT ENVIRONMENT**
1. Create Major.Minor.Patch tag (for example, 3.2.1).
   Commit "Release Major.Minor.Patch" and push to origin.
1. In Eclipse do a pull, Team > Show in History and verify tag is Major.Minor.Patch (for example, 2.3.1).
1. Create a "master-Major.Minor.Patch" branch and push to origin. Use: Eclipse context menu / Team / Push.
Optionally in this branch, Update client/src/version.js file to next Major.Minor.Patch followed by suffix 'dev' (for example: 2.3.2dev).   
1. In master, update client/src/version.js file to next Major.Minor.Patch followed by suffix 'dev' (for example: 2.4dev).
1. Commit with message "Update version.js to Major.Minor.Patchdev" and push to origin.
1. In GitHub mark Milestone Major.Minor.Patch closed.

&nbsp;

D. **FUTURES**
1. Discuss the next release, what work needs to be done and who does it.
   In other words, set the direction for the upcoming milestone.

