import React from 'react'
import PropTypes from 'prop-types'
import { ButtonTag } from './Style'
import { useNavigate } from "react-router-dom";

const Tag = ({ tagList, isDisable, color, isCollection = false }) => {
  const navigate = useNavigate();

  return (
    tagList.map((item, index) => {
      return <ButtonTag
        className="text-white text-left"
        color={color}
        key={index}
        disabled={isDisable}
        onClick={() => {
          console.log(isCollection);
          if (isCollection) navigate(`/collection/${item}`)
        }}
      >
        {item}
      </ButtonTag>
    })
  )
}

export default Tag

Tag.propTypes = {
  tagList: PropTypes.array,
  isDisable: PropTypes.bool,
  isCollection: PropTypes.bool,
  color: PropTypes.string
}
