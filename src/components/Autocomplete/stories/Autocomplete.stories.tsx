import * as React from 'react'
import { Story, Meta } from '@storybook/react'
import { ILocation } from '@starleaguecompany/types/locations'
import { useFetch, useDebounceValue } from '@starleaguecompany/package-react-utils'
import { Menu } from '@starleaguecompany/react-icons'

import { Autocomplete } from '..'
import { Button } from '../../Button'
import { Text } from '../../Typography'
import { reactDSImportPath } from '../../../constants/imports'

const Import = `\`\`\`javascript
// Import component
import { Autocomplete } from '${reactDSImportPath}'
// Import types
import { AutocompleteProps } from '${reactDSImportPath}/lib/Autocomplete'
\`\`\``

export default {
  title: 'Components/Autocomplete',
  component: Autocomplete,
  parameters: {
    componentSubtitle: 'The Autocomplete component allow user to type and select from a list of options',
    docs: {
      description: {
        component: Import,
      },
    },
  },
} as Meta

const options = [
  { label: 'Item 1', value: 0 },
  { label: 'Item 2', value: 1 },
  { label: 'Item 3', value: 2 },
  { label: 'Item 4', value: 3 },
]

export const Basic: Story = () => {
  const options = [
    { label: 'Ренесанс Кредит Банк', value: 0 },
    { label: 'РСХБ Банк', value: 1 },
    { label: 'Росбанк', value: 2 },
    { label: 'Связьбанк', value: 3 },
    { label: 'Русфинанс', value: 4 },
    { label: 'Райффайзенбанк', value: 5 },
    { label: 'Сургутнефтегазбанк', value: 6 },
    { label: 'Уникредитбанк', value: 7 },
    { label: 'РН Банк', value: 8 },
    { label: 'РосгосстахБанк', value: 9 },
  ]

  return <Autocomplete label="Банк" options={options} />
}
Basic.parameters = {
  docs: {
    storyDescription: 'Basic usage',
  },
}

export const Disabled: Story = () => (
  <Autocomplete label="Услуги" defaultValue={options[2].value} options={options} disabled />
)

export const Invalid: Story = () => (
  <Autocomplete label="Услуги" defaultValue={options[1].value} options={options} invalid />
)

export const WithAjax: Story = () => {
  const [searchValue, setSearchValue] = React.useState<string | undefined>(undefined)
  const debounceSearchValue = useDebounceValue<string | undefined>(searchValue, 300)
  const [{ get, data, loading }] = useFetch<ILocation[] | []>('https://api.sravni.ru/suggest/v1/locations')

  const handleChangeInput = React.useCallback((value: string) => {
    setSearchValue(value)
  }, [])

  const options = React.useMemo(() => {
    if (!data) {
      return []
    }

    return data.map((item: ILocation) => ({ label: item.name, value: item.id }))
  }, [data])

  React.useEffect(() => {
    if (debounceSearchValue) {
      get({ q: debounceSearchValue })
    }
  }, [debounceSearchValue])

  return (
    <Autocomplete label="Введите название города" options={options} loading={loading} onSearch={handleChangeInput} />
  )
}

export const WithPlaceholder: Story = () => <Autocomplete placeholder="Название города" options={options} />

export const WithCustomIcon: Story = () => (
  <Autocomplete placeholder="Название города" options={options} icon={<Menu />} />
)

export const WithoutIcon: Story = () => <Autocomplete placeholder="Название города" options={options} icon={null} />

export const WithNotFoundContent: Story = () => {
  const notFoundContent = React.useMemo(() => {
    return (
      <React.Fragment>
        <Text className="h-text-center h-mb-8" size={16} strong>
          Ничего не найдено :(
        </Text>
        <Button variant="primary" color="blue">
          Понятно
        </Button>
      </React.Fragment>
    )
  }, [])

  return <Autocomplete placeholder="Название города" options={options} notFoundContent={notFoundContent} />
}

export const ResizableAutocomplete: Story = () => {
  const longLabel = `Sit nulla est ex deserunt exercitation anim occaecat.Nostrud ullamco deserunt aute id consequat veniam incididunt duis in sint irure nisi.Mollit officia cillum Lorem ullamco minim nostrud elit officia tempor esse quis.`
  const options = [
    { label: 'Item 1', value: 0 },
    { label: 'Item 2', value: 1 },
    { label: 'Item 3', value: 2 },
    { label: longLabel, value: 3 },
  ]

  return <Autocomplete placeholder="Название города" options={options} fixedWidth resizable />
}

// export const AddNonExistentOption: Story = () => {
//   const defaultOptions = [
//     { label: 'Ренесанс Кредит Банк', value: 0 },
//     { label: 'РСХБ Банк', value: 1 },
//     { label: 'Росбанк', value: 2 },
//     { label: 'Связьбанк', value: '3' },
//   ]

//   const [value, setValue] = React.useState<AutocompleteValue>()
//   const [options, setOptions] = React.useState(defaultOptions)
//   const searchRef = React.useRef('')

//   const handleBlur = () => {
//     if (!options.some(o => o.label.toLowerCase() === searchRef.current.toLowerCase())) {

//       setOptions([...options, { label: searchRef.current, value: 'nonExistentOption' }])
//       setValue('nonExistentOption')
//     }
//   }

//   const handleSearch = (search: string) => {
//     searchRef.current = search

//     setOptions(
//       defaultOptions.filter(o => {
//         return o.label.toLowerCase().startsWith(search.toLowerCase())
//       })
//     )
//   }

//   return (
//     <Autocomplete
//       label="Банк"
//       options={options}
//       value={value}
//       onBlur={handleBlur}
//       onSearch={handleSearch}
//       onChange={(v) => console.log(v)}
//       notFoundContent={<div/>}
//     />
//   )
// }
