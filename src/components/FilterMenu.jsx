import React, { Component } from "react";
import { Formik, useField, Form, Field } from "formik";
import * as Yup from "yup";
import { observer } from "mobx-react";
import KeywordsMenu from "./KeywordsMenu";
import {
  StyledFilters,
  StyledKeywordsContainer,
  StyledFitlerContainer,
  StyledFilterButtons,
  StyledFilterHeader,
} from "../styling/styledCVPage";

const CustomSelectInput = ({ label, options, objKey, ...props }) => {
  const [field, meta] = useField(props);
  const arrayOfIndividualOptions = ["Please Select or Clear"];
  options.forEach((option) => {
    if (!arrayOfIndividualOptions.includes(option[objKey])) {
      arrayOfIndividualOptions.push(option[objKey]);
    }
  });
  return (
    <>
      <label htmlFor={props.name}>{label}</label>
      <Field as="select" {...field} {...props}>
        {arrayOfIndividualOptions.map((option, index) => {
          return <option key={index}>{option}</option>;
        })}
      </Field>
      {meta.touched && meta.error ? <div>{meta.error}</div> : null}
    </>
  );
};

const CustomCheckboxInput = ({ label, name, options, ...props }) => {
  return (
    <>
      <label>{label}</label>
      <Field name={name}>
        {({ field }) => {
          return options.map((option, index) => {
            return (
              <React.Fragment key={index}>
                <input
                  type="checkbox"
                  id={option.value}
                  {...field}
                  {...props}
                  value={option.value}
                />
                <label htmlFor={option.value}>{option.key}</label>
              </React.Fragment>
            );
          });
        }}
      </Field>
    </>
  );
};

const CustomTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input type="text" {...field} {...props} />
      {meta.touched && meta.error ? <div>{meta.error}</div> : null}
    </>
  );
};

const CustomRangeInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label
        htmlFor={props.id || props.name}
      >{`${label} ${field.value}`}</label>
      <input type="text" {...field} {...props} />
      {meta.touched && meta.error ? <div>{meta.error}</div> : null}
    </>
  );
};

class FilterMenu extends Component {
  state = { storedKeywordCodes: [] };
  handleKeywordCodes = (keywordCodes) => {
    this.setState({ storedKeywordCodes: keywordCodes });
  };
  render() {
    const { StaffID } = this.props.currentUser.currentUser[0];
    const { fullProjList } = this.props.fullDescProjList;
    const { keywordList } = this.props.staffKeywordList;
    const { fullDescProjList } = this.props;
    if (fullProjList.length < 1) return null;
    return (
      <Formik
        initialValues={{
          ClientName: "",
          includeConfidential: "",
          CountryName: "",
          PercentComplete: 0,
          StartDateAfter: "",
          EndDateBefore: "",
          EndDateAfter: "",
        }}
        validationSchema={Yup.object({})}
        onSubmit={(values, { setSubmitting }) => {
          console.log(values);
          fullDescProjList
            .fetchProjects(StaffID, values, this.state.storedKeywordCodes)
            .then(() => {
              setSubmitting(false);
            });
        }}
      >
        {({ isSubmitting, resetForm }) => (
          <>
            <Form>
              <StyledFilters>
                <StyledFilterHeader>
                  <h3>Filters</h3>
                  <hr /> <br />
                </StyledFilterHeader>
                <StyledFitlerContainer>
                  <CustomTextInput
                    label="Start Date After:  "
                    name="StartDateAfter"
                    type="date"
                  />
                  <CustomTextInput
                    label="End Date Before: "
                    name="EndDateBefore"
                    type="date"
                  />
                  <CustomTextInput
                    label="End Date After:     "
                    name="EndDateAfter"
                    type="date"
                  />
                  <CustomRangeInput
                    label="Min Project Completion: "
                    name="PercentComplete"
                    min="0"
                    max="100"
                    step="5"
                    type="range"
                  />
                  <CustomSelectInput
                    label="Client Name: "
                    name="ClientName"
                    id="filterClient"
                    options={fullProjList}
                    objKey="ClientName"
                  />
                  <CustomSelectInput
                    label="Country Name: "
                    name="CountryName"
                    id="filterCountry"
                    options={fullProjList}
                    objKey="CountryName"
                  />
                  <CustomCheckboxInput
                    name="includeConfidential"
                    label="Include Confidential?"
                    options={[{ value: "true" }]}
                  />
                </StyledFitlerContainer>
                <StyledKeywordsContainer>
                  Select Keyword Groups:
                  <KeywordsMenu
                    keywordList={keywordList}
                    handleKeywordCodes={this.handleKeywordCodes}
                  />
                </StyledKeywordsContainer>

                <StyledFilterButtons>
                  <hr />
                  <button type="submit">
                    {isSubmitting ? "Loading..." : "Submit"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      fullDescProjList.fetchProjects(StaffID);
                      fullDescProjList.clearNoResultError();
                      resetForm();
                    }}
                  >
                    Clear Filters
                  </button>
                </StyledFilterButtons>
              </StyledFilters>
            </Form>
          </>
        )}
      </Formik>
    );
  }
}

export default observer(FilterMenu);
