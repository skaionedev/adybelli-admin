import AppModal from '@/components/common/modal'
import FormSelect from '@/components/form/select'
import { IOrderProductFull } from '@/hooks/queries/orders/types'
import { useOrdersOneQuery } from '@/hooks/queries/orders/useOrdersOneQuery'
import { useStatusesAllQuery } from '@/hooks/queries/statuses/useStatusesAllQuery'
import { getAxios } from '@/lib/axios'
import { filterOutFalsyItems } from '@/lib/utils'
import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
import {
  Button,
  Chip,
  CircularProgress,
  IconButton,
  MenuItem,
  Stack,
  Tooltip
} from '@mui/material'
import React from 'react'
import { useForm } from 'react-hook-form'
import { FaSave, FaTimes } from 'react-icons/fa'
import { MdModeEdit } from 'react-icons/md'
import { toast } from 'react-toastify'
import { schema } from './schema'

const axios = getAxios()

const OrderDetailOrderStatus = () => {
  const { refetch, data } = useOrdersOneQuery()
  const [isOpen, setIsOpen] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const { data: statuses } = useStatusesAllQuery()

  const openModal = () => setIsOpen(true)

  const defaultValues = {
    status: data?.status ?? ''
  }

  async function onSubmit(values: typeof defaultValues) {
    try {
      setIsLoading(true)
      const dataToServer = filterOutFalsyItems(values)

      await axios.patch(`/admin/orders/${data?.order_id}`, dataToServer)
      await refetch()
      setIsLoading(false)
      setIsOpen(false)
      toast.success('Статус успешно изменен')
    } catch (error: any) {
      console.log(error)

      setIsLoading(false)
      const errorMessage = error?.response?.data?.message || 'Что-то пошло не так'
      toast.error(errorMessage, {
        toastId: 'submit-error'
      })
    }
  }
  const { control, handleSubmit, reset } = useForm<typeof defaultValues>({
    defaultValues,
    resolver: yupResolver(schema)
  })
  React.useEffect(() => {
    // if (isOpen) reset()
  }, [isOpen, reset])

  return (
    <>
      {data?.status && (
        <Chip
          icon={<MdModeEdit style={{ paddingLeft: 4 }} size={20} />}
          label={data?.statusDetail?.name}
          onClick={openModal}
        />
      )}
      {/* <Tooltip title="Изменит статус">
        <IconButton size="small" onClick={openModal}>
          <MdModeEdit size={20} />
        </IconButton>
      </Tooltip> */}

      <AppModal
        title="Изменить статус заказа"
        open={isOpen}
        onClose={setIsOpen}
        disableBackdropClick
        maxWidth="sm"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2} style={{ width: '100%' }}>
            <FormSelect name="status" label="Статус" control={control}>
              {statuses?.map(s => (
                <MenuItem key={s.id} value={s.code}>
                  {s.name}
                </MenuItem>
              ))}
            </FormSelect>
          </Stack>

          <Stack
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
            spacing={1}
            sx={{ mt: 3 }}
          >
            <Button
              disabled={isLoading}
              startIcon={<FaTimes size="18" />}
              disableElevation
              type="button"
              variant="contained"
              color="error"
              onClick={() => setIsOpen(false)}
            >
              Отмена
            </Button>
            <Button
              disabled={isLoading}
              startIcon={
                isLoading ? <CircularProgress size=".9em" /> : <FaSave size="18" />
              }
              disableElevation
              type="submit"
              variant="contained"
              color="primary"
            >
              Создать
            </Button>
          </Stack>
        </form>
      </AppModal>
    </>
  )
}

export default OrderDetailOrderStatus
