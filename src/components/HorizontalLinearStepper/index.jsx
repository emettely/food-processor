import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  button: {
    marginRight: theme.spacing(1)
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  }
}));

// const steps = [
// { label: "Add URL", content: "Add recipe URL" },
// { label: "Fill in form", content: "Fill in form" },
// { label: "default", content: "Unknown step" }
// ];

const HorizontalLinearStepper = props => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const { steps } = props;

  const defaultStep = "Unknown step";

  const getStepContent = index => {
    const step = steps[index];
    return step.content;
  };

  const isStepOptional = step => {
    return step === 0;
  };

  const isStepSkipped = step => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep(prevActiveStep => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleSubmit = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep(prevActiveStep => prevActiveStep + 1);
    setSkipped(prevSkipped => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const NextButton = () => (
    <Button
      variant="contained"
      color="primary"
      onClick={handleNext}
      className={classes.button}
    >
      Next
    </Button>
  );

  const SubmitButton = () => (
    <Button
      variant="contained"
      color="primary"
      onClick={handleSubmit}
      className={classes.button}
    >
      Submit
    </Button>
  );

  const SkipButton = () => (
    <Button
      variant="contained"
      color="primary"
      onClick={handleSkip}
      className={classes.button}
    >
      Skip
    </Button>
  );

  const BackButton = () => (
    <Button
      disabled={activeStep === 0}
      onClick={handleBack}
      className={classes.button}
    >
      Back
    </Button>
  );

  const IntermediateStep = () => (
    <div>
      <Typography className={classes.instructions}>
        {getStepContent(activeStep)}
      </Typography>
      <div>
        <BackButton />

        {isStepOptional(activeStep) && <SkipButton />}

        {activeStep === steps.length - 1 ? <SubmitButton /> : <NextButton />}
      </div>
    </div>
  );

  const LastInstruction = () => (
    <div>
      <Typography className={classes.instructions}>Added recipe!</Typography>
      <Button onClick={handleReset} className={classes.button}>
        Add another
      </Button>
    </div>
  );

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep}>
        {steps.map((step, index) => {
          const { label, content } = step;
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <LastInstruction />
        ) : (
          <IntermediateStep />
        )}
      </div>
    </div>
  );
};

export default HorizontalLinearStepper;
