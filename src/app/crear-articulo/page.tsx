'use client'
import { TfiWrite } from 'react-icons/tfi'
import { AiFillEye } from 'react-icons/ai'
import { FaFileUpload } from 'react-icons/fa'
import { GrUpdate } from 'react-icons/gr'
import {MdOutlineCreate} from 'react-icons/md'
import { Button } from '@nextui-org/react'
import { Textarea } from '@nextui-org/react'

export default function CrearArticulo() {
  return (
    <div className='p-7'>

      <div className='flex justify-between mb-4'>

        <div className='flex items-center space-x-2 justify-start'>
          <p className='font-bold text-2xl'>
            Crear artículo
          </p>
          <TfiWrite size='1.5em' />
        </div>

        <div className='justify-end'>
          <Button className='bg-blue-300' aria-label="vista-previa">
            Vista previa <AiFillEye />
          </Button>
        </div>

      </div>

      <div className='justify-start mb-8'>
        <p className='font-bold text-lg'>
          Imagen
        </p>
        <p className='text-base mb-2'>
          Añadir imagen principal para el artículo
        </p>
        <div className='flex items-center'>

          <div>
            <Button className='bg-blue-400 h-9 w-[6.5rem] mr-4'>
              Subir imagen
            </Button>
          </div>

          <div id="divider" className='w-0.5 h-8 bg-zinc-950 mr-3'>

          </div>

          <div>
            <p id = "image-filename" className='text-base text-zinc-600'>
              sample.png
            </p>
          </div>

        </div>
      </div>

      <div className='justify-start w-2/4'>
        <p className='font-bold text-lg'>
          Contenido
        </p>
        <p className='text-base mb-2'>
          Añadir contenido para el artículo que será creado. Puede importarse como archivo .txt o escribirse en el campo de texto
        </p>
        <div className='mb-2'>
          <Button className='bg-gray-300'>
            <FaFileUpload /> Añadir archivo nuevo (.txt)
          </Button>
        </div>
      </div>

      <div className='mb-5'>
        <Textarea
          key='bordered'
          variant='bordered'
          minRows={10}
          maxRows = {1000}
          labelPlacement="outside"
          placeholder="Empieza a escribir tu artículo..."
          className="w-full"

        />
      </div>
      <div>
        <Button className='w-36 bg-blue-400 mb-2'>
          <GrUpdate /> Generar título
        </Button>

        <Textarea
          key='bordered'
          variant='bordered'
          minRows={1}
          labelPlacement="outside"
          className="w-full mb-2"

        />

        <Button className='bg-blue-400 mb-2 w-36'>
          <MdOutlineCreate /> Crear artículo
        </Button>


      </div>

    </div>
  )
}