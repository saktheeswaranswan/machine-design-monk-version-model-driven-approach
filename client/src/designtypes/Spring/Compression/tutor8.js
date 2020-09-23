import React from 'react';
import { changeSymbolValue, fixSymbolValue, changeSymbolConstraint, loadInitialState, setSymbolFlag, saveOutputSymbolConstraints, changeLabelsValue, search } from '../../../store/actionCreators';
import { MIN, MAX, CONSTRAINED } from '../../../store/actionTypes';
export const execute = {
    steps: [
        {
            title: "Session Now In Progress",
            text: (
                <React.Fragment>
                    <p>
                    </p>
                    
                    <p>
                    Coming soon ...
                    Tutorial content on the ODOP Trade feature.
                    In the mean time, refer to the on-line documentation section (Help entry) on 
                    &nbsp;<a href="https://www.springdesignsoftware.org/odop/docs/Help/trade" target="_blank" rel="noopener noreferrer">Trade</a>&nbsp; 
                    for additional details.
                    </p>
                    
                    <p>
                    </p>
                    
                    <p>
                    As with the other tutorial and demo sessions, 
                    this session needs to start from a known state.  
                    So, if you have entered any work of value that is not yet saved,
                    use the <b>File : Save</b> menu item to save your work before continuing.
                    Moving to the next page will establish the necessary initialState
                    for the ODOP Compression Spring design type.
                    </p>
                    
                    <p>
                    To continue with this session, just <b>click the "Next" button</b> as you finish
                    reading each page (step). 
                    </p>
                    <br />
                </React.Fragment>
            )
        },
        {
            title: "Page 02 of 07",
            text: (
                <React.Fragment>
                    <p>
                    The initial conditions expected by this tutorial session are now established.
                    </p>
                    
                    <p>
                    To demonstrate the use of Trade, it will be necessary to find a
                    problem that does not have a feasible solution.  
                    Back in the tutorial section tutor4 where the <b>File : Save</b> and <b>File : Open</b> menu items were covered,
                    we invented a problem that did not initially have a feasible solution.
                    Let's look at that one again.  It went something like:
                    <br /><br />
                    Suppose we want a spring that will fit in a 2.00 inch diameter hole,
                    that can be no more than 1.20 inches deep 
                    (i.e. the spring's solid height must be less than this value).  
                    The spring must support 250 pounds and sustain at least
                    1.0 inch of deflection from no load to full load.
                    <br /><br />
                    We add the requirement of a long cycle life and start by entering
                    what we know about the design.
                    </p>
                    
                    <p>
                    The tutorial will impose these requirements in the process of moving to the next page.
                   </p>
                </React.Fragment>
            ),
            actions: [
                loadInitialState('Spring/Compression'),
                changeSymbolValue("L_Free", 3.0),
                changeSymbolConstraint('%_Avail_Deflect', MAX, 98.),
                changeLabelsValue([{name: 'COMMENT', value: 'Compression Spring Demo'}])
            ]
        },
        {
            title: "Page 03 of 07",
            text: (
                <React.Fragment>
                    <p>
                    </p>
                    
                    <p>
                    In "Tutorial shorthand", the changes just imposed by the tutorial are:<br />
                    <br />
                        CHANGE Life_Category "1 million cycles - Not Peened" &nbsp; &#60;--- request nearest cycle life category<br />
                        CHANGE  FS_CycleLife MIN  1.0<br />
                        CHANGE  OD_Free MAX  1.950 &nbsp; &#60;--- 0.050 margin for hole<br />
                        CHANGE  L_Solid MAX  1.2<br />
                        CHANGE  L_Stroke MIN 1.0<br />
                        FIX  Force_1  0<br />
                        FIX  Force_2  250<br />
                    </p>
                    
                    <p>
                    Now we're set up to consider designs that will have a long cycle life.
                    The 250 pound load has given us an unreasonable start point. 
                    Look for warnings on Report 1.
                    In this case, we'll ignore the warning.
                    </p>

                    <p>
                    Moving to the next page will execute a search to determine if a feasible solution is available.
                    </p>
                    
                    <p>
                    </p>

                    <p>
                    </p>
                    <br />
                </React.Fragment>
            ),
            actions: [
                changeSymbolValue("Life_Category",3),
                saveOutputSymbolConstraints('FS_CycleLife'),
                setSymbolFlag('FS_CycleLife', MIN, CONSTRAINED),
                changeSymbolConstraint('FS_CycleLife', MIN, 1.0),
                saveOutputSymbolConstraints('OD_Free'),
                setSymbolFlag('OD_Free', MAX, CONSTRAINED),
                changeSymbolConstraint('OD_Free', MAX, 1.950),
                saveOutputSymbolConstraints('L_Solid'),
                setSymbolFlag('L_Solid', MAX, CONSTRAINED),
                changeSymbolConstraint('L_Solid', MAX, 1.2),
                saveOutputSymbolConstraints('L_Stroke'),
                setSymbolFlag('L_Stroke', MIN, CONSTRAINED),
                changeSymbolConstraint('L_Stroke', MIN, 1.0),
                fixSymbolValue('Force_1', 0.0),
                fixSymbolValue('Force_2', 250.0)
            ]
        },
        {
            title: "Page 04 of 07",
            text: (
                <React.Fragment>
                    <p>
                    The search couldn't find a design that satisfied all of our objectives
                    so it did its best and found a compromise.
                    </p>
                    
                    <p>
                    If you scroll down, you can see that several constraints are violated.  
                    The relative magnitude of those violations contains information as to 
                    which constraints are most leveraged.  
                    The search finds that it is to its advantage to violate
                    some constraints more than others.
                    </p>
                    
                    <p>
                    This design obviously needs some work.
                    </p>
                    
                    <p>
                    In the rest of this tutorial section we will use <b>Action : Trade:</b> 
                    to look at how the constraints on outside diameter and solid height 
                    trade off against each other.
                    </p>
                    <br />
                </React.Fragment>
            ),
            actions: [
                search()
            ]
        },
        {
            title: "Page 05 of 07",
            text: (
                <React.Fragment>
                    <p>
                    Trade will ask for "weights" to apply to each of the violated
                    constraints.  These weights define the direction that Trade will
                    investigate for constraint relaxation.  Only the relative size of
                    the weights matters.  Trade will normalize the input to unit value.
                    </p>
                    
                    <p>
                    Trade needs the user to enter an exploration size.  The accuracy of this
                    estimate is not critical.  If the number entered is too large, Trade
                    will find a feasible solution, report the results and offer the
                    opportunity to start again with a smaller step.  If the estimate is too
                    small, a second or even third pass through the Trade process may be
                    taken to refine the result.  The estimate of the appropriate step size
                    can be gauged by looking at the magnitude of the constraint violations.
                    The exploration size in percent should be larger than the largest
                    percentage constraint violation.  Perhaps even larger than the sum of
                    all the constraint violations.
                    </p>
                    
                    <p>
                    The tutorial is not yet ready to directly control the Trade feature.
                    You will need to take a more active role.
                    </p>
                    
                    <p>
                    Drop down the Action menu and select Trade.
                    Select the "Arbitrary" strategy (green button).
                    </p>
                    <br /><br />
                </React.Fragment>
            ),
            actions: [
            ]
        },
        {
            title: "Page 06 of 07",
            text: (
                <React.Fragment>
                    <p>
                    </p>
                
                    <p>
                    </p>
                    
                    <p>
                    </p>
                    <br />
                </React.Fragment>
            )
        },
        {
            title: "Page 07 of 07 (last page)",
            text: (
                <React.Fragment>
                    <p>
                    Congratulations, you've finished another section of the tutorial.
                    Take a few minutes at this point to experiment on your own. 
                    </p>
                    
                    <p>
                    Also, look in the on-line documentation section (Help entry) titled  
                    &nbsp;<a href="https://www.springdesignsoftware.org/odop/docs/Help/SpringDesign" 
                    target="_blank" rel="noopener noreferrer">TODO</a>.&nbsp; 
                    </p>
                    
                    <p>
                    More tutorial sessions are available. 
                    They have names like tutor3, tutor4, ... etc. 
                    Refer to the on-line documentation section (Help entry) covering the  
                    &nbsp;<a href="https://www.springdesignsoftware.org/odop/docs/Help/tutordemo" target="_blank" rel="noopener noreferrer">Tutorial and Demo</a>&nbsp; 
                    for a list of topics.
                    </p>
                    <br /><br />
                </React.Fragment>
            )
        }
    ]
}
