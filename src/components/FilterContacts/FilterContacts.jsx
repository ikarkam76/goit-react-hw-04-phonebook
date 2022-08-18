import React from "react";
import PropTypes from 'prop-types';
import {Filter, FilterLabel} from "components/FilterContacts/FilterContacts.styled";

const FilterContacts = ({ value, onChange }) => (
  <Filter>
    <FilterLabel>
      Filter
      <input type="text" value={value} onChange={onChange} />
    </FilterLabel>
  </Filter>
);

export default FilterContacts;

FilterContacts.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}