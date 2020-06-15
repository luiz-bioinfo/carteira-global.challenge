import React, { useEffect, useState } from 'react';

import './styles.css';

interface Option {
  key: number;
  value: string;
}

interface Props {
  options: Option[];
  selectedOptions?: Option[];
  onChange: (options: string[]) => void;
}

const CustomSelect: React.FC<Props> = props => {

  const [ active, setActive ]                   = useState<boolean>(false),
        [ searchTerm, setSearchTerm ]           = useState<string>(''),
        [ selectedOptions, setSelectedOptions ] = useState<Option[]>(props.selectedOptions || []);

  const { onChange } = props;

  useEffect(() => {
    onChange(selectedOptions.map(selectedOption => selectedOption.value));
  }, [ selectedOptions ]);

  function handleSelectOption(option: Option) {
    if (!selectedOptions.includes(option))
      setSelectedOptions([ ...selectedOptions, option ]);
    else {
      const options = selectedOptions.filter(selectedOption => {
        return selectedOption.key !== option.key;
      });
      setSelectedOptions(options);
    }
  }

  return (
    <div
      className={
        [
          'custom-select',
          active ? 'active' : '_no_active'
        ].join(' ').trim()
      }
      tabIndex={ 0 }
      onBlur={ () => setActive(false) }
    >
      <div
        className={
          [
            'selected-options',
            selectedOptions.length > 0 ? 'active' : ''
          ].join(' ').trim()
        }
        onClick={ () => setActive(!active) }
      >
        {
          selectedOptions.length === 0
            ? 'Nenhum'
            : (selectedOptions.length + ' ' + (selectedOptions.length === 1
              ? 'selecionado'
              : 'selecionados'
            )
          )
        }
      </div>
      <ul className="options">
        <input
          type="text"
          placeholder="Buscar..."
          spellCheck={ false }
          value={ searchTerm }
          onChange={ e => setSearchTerm(e.target.value) }
        />
        {
          props.options.map(option => {
            return (
              <li
                key={ option.key }
                className={ selectedOptions.includes(option) ? 'active' : '_no_active' }
                onClick={ () => handleSelectOption(option) }
                hidden={
                  searchTerm === ''
                    ? false
                    : !option.value.toLowerCase().includes(searchTerm.toLowerCase())
                }
              >
                { option.value }
              </li>
            );
          })
        }
        <li
          className="noResults"
          hidden={
            props.options
              .map(option => option.value)
              .join(' ')
              .toLowerCase()
              .includes(searchTerm.toLowerCase())
          }
        >
          Nenhum resultado
        </li>
      </ul>
    </div>
  );
};

export default CustomSelect;