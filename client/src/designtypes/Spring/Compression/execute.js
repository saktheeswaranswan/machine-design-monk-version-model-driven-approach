import config from '../../../config';
export function getExecuteNames() {
    var result;
    if (config.node.env !== "production") {
      result = [
        'mkDemo',                     // Script to make Demo Startup file from Load Initial State
        'mkHotWound',                 // Script to make Hot Wound Startup file from Load Initial State
        'mkHotWoundMetric',           // Script to make Hot Wound Startup Metric file from Load Initial State Metric
        'mkStartup',                  // Script to make Startup file from Load Initial State
        'mkStartup_Metric',           // Script to make Startup Metric file from Load Initial State Metric
        'setupDesignValidateCalc',    // Script to optimize default FIXes and constraints for design validation in Calculator view
        'tweakPrefs',                 // Script to tweak Preference values for greater precision of search result
        'welcomeAdv',                 // Script to guide novice users - Advanced view; spring type neutral
        'welcomeCalc'                 // Script to guide novice users - Calculator view; spring type neutral
      ];
    } else {
      result = [
        'tweakPrefs'
      ];
    }
//    console.log('In getExecuteNames result=',result);
    return result;
}

export function getDemoNames() {
    var result = [
        'demoDesignValidation',
        'demoNewDesign',
        'demo1',
        'demo2',
        'demo3',
        'demo5',
        'demo10'
    ];
//    console.log('In getDemoNames result=',result);
    return result;
}

export function getTutorialNames() {
    var result = [
        'tutorTour',
        'guidedDesign',
        'tutor',
        'tutor3',
        'tutor4',
        'tutor5',
        'tutor6',
        'tutor7',
        'tutor8',
        'tutor9'
    ];
//    console.log('In getTutorialNames result=',result);
    return result;
}
