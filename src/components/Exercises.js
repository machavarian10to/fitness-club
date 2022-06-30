import React, {useEffect, useState} from 'react'
import Pagination from '@mui/material/Pagination'
import {Box, Stack, Typography} from '@mui/material'

import ExerciseCard from './ExerciseCard'
import {exerciseOptions, fetchData} from '../utils/fetchData'

const Exercises = ({exercises, setExercises, bodyPart, currentPage, setCurrentPage}) => {
  const exercisesPerPage = 9;

  const indexOfLastExercise = currentPage * exercisesPerPage
  const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage
  const currentExercises = exercises.slice(indexOfFirstExercise, indexOfLastExercise)

  const paginate = (e,value) => {
    setCurrentPage(value)

    window.scrollTo({top: 1620, behavior: 'smooth'})
  }

  useEffect(() => {
    const fetchExercisesData = async() => {
      let exercisesData = [];

      if(bodyPart === 'all'){
        exercisesData = await fetchData('https://exercisedb.p.rapidapi.com/exercises', exerciseOptions)
      }else{
        exercisesData = await fetchData(`https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}`, exerciseOptions)
      }

      setExercises(exercisesData)
      setCurrentPage(1);
    }

    fetchExercisesData()
  }, [bodyPart])

  return ( 
    <Box id='exercises' 
      sx={{mt: {lg: '10px'}}}
      mt='50px'
      p='20px'
    >
    <Typography variant='h3' mb='46px'>
      Showing Results
    </Typography>
    <Stack direction='row' sx={{gap: {lg: '110px', xs: '50px'}}}
    flexWrap='wrap' justifyContent='center'>
      {currentExercises.length > 0
        ? currentExercises.map((exercise, index) => (
          <ExerciseCard key={index} exercise={exercise} /> ))
        : <Typography textTransform='capitalize' fontSize='55px' color='#ff2625'>
            no results found
          </Typography>
      }
    </Stack>
    <Stack mt='100px' alignItems='center'>
      {exercises.length > 9 && (
        <Pagination 
          color='standard'
          shape='rounded'
          defaultPage={1}
          count={Math.ceil(exercises.length / exercisesPerPage )}
          page={currentPage}
          onChange={paginate}
          size='large'
        />
      )}
    </Stack>
    </Box>
  )
}

export default Exercises