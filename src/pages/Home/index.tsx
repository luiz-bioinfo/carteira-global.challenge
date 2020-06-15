import React, { useEffect, useState } from 'react';
import path from 'path';

/* Icons */ 

import {
  FiArrowDown,
  FiArrowLeft,
  FiArrowRight,
  FiArrowUp,
  FiFilter,
  FiHelpCircle,
  FiLayers,
  FiX
} from 'react-icons/fi';

import {
  MdImportExport,
  MdStar,
  MdStarBorder
} from 'react-icons/md';

/* Components */

import CustomSelect from '../../components/CustomSelect';
import CustomSlider from '../../components/Slider';
import OptionButton from '../../components/OptionButton';
import Toggle from 'react-toggle';

/* CSS */

import './styles.css';
import './mobile.css';

/* API */

import api from '../../services/api';

/* Interfaces */

interface FII {
  id: number;
  ticker: string;
  nome_fundo: string;
  setor: string;
  preco_atual: number;
  variacao_dia: number;
  ultimo_dividendo: number;
  ultimo_dy: number;
  variacao_cota_desde_ipo: number;
  variacao_cota_dividendos_desde_ipo: number;
  p_vp: number;
  percentual_em_caixa: number;
  numero_cotistas: number;
  patrimonio: number;
  liquidez_diaria: number;
  favoritar: boolean;
  [key: string]: string | number | boolean;
}

interface Filters {
  ticker: string[];
  nome_fundo: string[];
  setor: string[];
  preco_atual: ReadonlyArray<number>;
  variacao_dia: ReadonlyArray<number>;
  ultimo_dividendo: ReadonlyArray<number>;
  ultimo_dy: ReadonlyArray<number>;
  variacao_cota_desde_ipo: ReadonlyArray<number>;
  variacao_cota_dividendos_desde_ipo: ReadonlyArray<number>;
  p_vp: ReadonlyArray<number>;
  percentual_em_caixa: ReadonlyArray<number>;
  numero_cotistas: ReadonlyArray<number>;
  patrimonio: ReadonlyArray<number>;
  liquidez_diaria: ReadonlyArray<number>;
  favoritar: boolean;
  [key: string]: string[] | ReadonlyArray<number> | boolean;
}

interface Option {
  key: number;
  value: string;
}

interface Column {
  id: number;
  key: string;
  name: string;
  visible: boolean;
  sort: {
    byThis: boolean;
    asc: boolean;
  };
  type: number; // 1 = MultiSelect, 2 = Slider, 3 = Toggle
  selectOptions?: Option[];
  slider?: {
    domain: ReadonlyArray<number>;
    step: number;
    format: (value: number) => string;
  };
}

/* Main Component */

const Home:React.FC = () => {
  
  /* Checking whether the device is mobile or not */

  const [ isMobile, setIsMobile ] = useState<boolean>(false);

  useEffect(() => {
    if (window.orientation > -1 || window.innerWidth <= 740)
      setIsMobile(true);
    else
      setIsMobile(false);
  }, []);

  /* Columns settings */

  const [ columns, setColumns ] = useState<Column[]>([
    {
      id: 1,
      key: 'ticker',
      name: 'Ticker',
      visible: true,
      sort: {
        byThis: true,
        asc: true
      },
      type: 1
    },
    {
      id: 2,
      key: 'nome_fundo',
      name: 'Nome do Fundo',
      visible: true,
      sort: {
        byThis: false,
        asc: true
      },
      type: 1
    },
    {
      id: 3,
      key: 'setor',
      name: 'Setor',
      visible: true,
      sort: {
        byThis: false,
        asc: true
      },
      type: 1
    },
    {
      id: 4,
      key: 'preco_atual',
      name: 'Preço Atual',
      visible: true,
      slider: {
        domain: [0, 200],
        step: 1,
        format: (value: number) => Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 }).format(value)
      },
      sort: {
        byThis: false,
        asc: true
      },
      type: 2
    },
    {
      id: 5,
      key: 'variacao_dia',
      name: 'Variação no Dia',
      visible: true,
      slider: {
        domain: [-20, 20],
        step: 1,
        format: (value: number) => Intl.NumberFormat('pt-BR', { style: 'percent', minimumFractionDigits: 2 }).format(value / 100)
      },
      sort: {
        byThis: false,
        asc: true
      },
      type: 2
    },
    {
      id: 6,
      key: 'ultimo_dividendo',
      name: 'Último Dividendo',
      visible: true,
      slider: {
        domain: [0, 20],
        step: 1,
        format: (value: number) => Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 }).format(value)
      },
      sort: {
        byThis: false,
        asc: true
      },
      type: 2
    },
    {
      id: 7,
      key: 'ultimo_dy',
      name: 'Último DY',
      visible: true,
      slider: {
        domain: [-20, 20],
        step: 1,
        format: (value: number) => Intl.NumberFormat('pt-BR', { style: 'percent', minimumFractionDigits: 2 }).format(value / 100)
      },
      sort: {
        byThis: false,
        asc: true
      },
      type: 2
    },
    {
      id: 8,
      key: 'variacao_cota_desde_ipo',
      name: 'Variação Cota desde IPO',
      visible: true,
      slider: {
        domain: [0, 100],
        step: 1,
        format: (value: number) => Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 }).format(value)
      },
      sort: {
        byThis: false,
        asc: true
      },
      type: 2
    },
    {
      id: 9,
      key: 'variacao_cota_dividendos_desde_ipo',
      name: 'Variação da Cota + Dividendos desde IPO',
      visible: true,
      slider: {
        domain: [0, 100],
        step: 1,
        format: (value: number) => Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 }).format(value)
      },
      sort: {
        byThis: false,
        asc: true
      },
      type: 2
    },
    {
      id: 10,
      key: 'p_vp',
      name: 'P/VP',
      visible: true,
      slider: {
        domain: [0, 2],
        step: 0.1,
        format: (value: number) => Intl.NumberFormat('pt-BR', { style: 'decimal', minimumFractionDigits: 2 }).format(value)
      },
      sort: {
        byThis: false,
        asc: true
      },
      type: 2
    },
    {
      id: 11,
      key: 'percentual_em_caixa',
      name: '% em Caixa',
      visible: true,
      slider: {
        domain: [0, 100],
        step: 1,
        format: (value: number) => Intl.NumberFormat('pt-BR', { style: 'percent', minimumFractionDigits: 2 }).format(value / 100)
      },
      sort: {
        byThis: false,
        asc: true
      },
      type: 2
    },
    {
      id: 12,
      key: 'numero_cotistas',
      name: 'Número de Cotistas',
      visible: true,
      slider: {
        domain: [0, 100000],
        step: 1000,
        format: (value: number) => Intl.NumberFormat('pt-BR', { style: 'decimal', maximumFractionDigits: 0 }).format(value)
      },
      sort: {
        byThis: false,
        asc: true
      },
      type: 2
    },
    {
      id: 13,
      key: 'patrimonio',
      name: 'Patrimônio',
      visible: true,
      slider: {
        domain: [0, 1000000000],
        step: 1000,
        format: (value: number) => Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 }).format(value)
      },
      sort: {
        byThis: false,
        asc: true
      },
      type: 2
    },
    {
      id: 14,
      key: 'liquidez_diaria',
      name: 'Liquidez Diária',
      visible: true,
      slider: {
        domain: [0, 15000000],
        step: 1000,
        format: (value: number) => Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 }).format(value)
      },
      sort: {
        byThis: false,
        asc: true
      },
      type: 2
    },
    {
      id: 15,
      key: 'favoritar',
      name: 'Favoritar',
      visible: true,
      sort: {
        byThis: false,
        asc: true
      },
      type: 3
    }
  ]);

  /* Sort and visibility functions */

  function toggleSortKey(target: Column) {
    const order = target.sort.byThis ? !target.sort.asc : true;

    setColumns(columns.map(column => {
      if (column.key === target.key)
        return {
          ...column,
          sort: { byThis: true, asc: order }
        }
      else
        return {
          ...column,
          sort: { byThis: false, asc: column.sort.asc }
        }
    }));

    const key = target.key;

    const sortedResults = FIIs.sort((a, b) => {
      const comp = a[key] < b[key] ? -1 : 1;
      return order ? comp : -comp;
    });

    setFIIs(sortedResults);
  }

  function toggleVisibility(target: Column) {
    setColumns(columns.map(column => {
      if (column.key === target.key)
        return {
          ...column,
          visible: !target.visible
        }
      else
        return column;
    }));
  }

  /*
   *  JSON File Loading
   */

  useEffect(() => {

    api.get(path.resolve(__dirname, 'data', 'fii.json'))
      .then(response => {
        setFIIs(response.data.results);
        setUpdateDatetime(new Date().toString());
      })
      .catch(() => {
        alert('Infelizmente, não foi possível carregar o arquivo de dados. Tente novamente em alguns instantes!');
      });

  }, []);

  /* Pagination & filters */
  
  const [ FIIs, setFIIs ] = useState<FII[]>([]);

  const [ numberOfPages, setNumberOfPages ] = useState<number>(0),
        [ currentPage, setCurrentPage ]     = useState<number>(1),
        [ itemsPerPage, setItemsPerPage ]   = useState<number>(20);

  const [ currentPageFIIs, setCurrentPageFIIs ] = useState<FII[]>([]);
  
  const [ numberOfFilteredResults, setNumberOfFilteredResults ] = useState<number>(0);
  
  const [ filters, setFilters ] = useState<Filters>({
    ticker: [],
    nome_fundo: [],
    setor: [],
    preco_atual: [0, 200],
    variacao_dia: [-20, 20],
    ultimo_dividendo: [0, 20],
    ultimo_dy: [-20, 20],
    variacao_cota_desde_ipo: [0, 100],
    variacao_cota_dividendos_desde_ipo: [0, 100],
    p_vp: [0, 2],
    percentual_em_caixa: [0, 100],
    numero_cotistas: [0, 100000],
    patrimonio: [0, 1000000000],
    liquidez_diaria: [0, 15000000],
    favoritar: false
  });

  function setFilter(column: Column, value: string[] | ReadonlyArray<number> | boolean) {
    setFilters({ ...filters, [column.key]: value });
  }
  
  useEffect(() => {
    const filteredFIIs = FIIs.filter(FII => {
      const filteredColumns = columns.filter(column => {
        const filter = filters[column.key];
        switch(column.type) {
          case 1:
            const f = filter.valueOf().toString();
            if (!f) 
              return true;
            else
              return f.split(',').includes(FII[column.key].toString());
          case 2:
            const interval = filter.valueOf().toString().split(',');
            return FII[column.key] >= parseFloat(interval[0]) && FII[column.key] <= parseFloat(interval[1]);
          case 3:
            if (filter.valueOf())
              return filter.valueOf() === FII[column.key];
            else
              return true;
        }
      }).length;
      if (filteredColumns === columns.length)
        return true;
      else
        return false;
    });
    setNumberOfFilteredResults(filteredFIIs.length);
    const end   = currentPage * itemsPerPage,
          start = end - itemsPerPage;
    setCurrentPageFIIs(
      filteredFIIs.slice(start, end)
    );
  }, [ FIIs, itemsPerPage, currentPage, columns, filters ]);

  useEffect(() => {
    setCurrentPage(1);
    setNumberOfPages(Math.ceil(numberOfFilteredResults / itemsPerPage));
  }, [ FIIs, itemsPerPage, filters, numberOfFilteredResults ]);

  useEffect(() => {
    setColumns(columns.map(column => {
      if (column.type !== 1)
        return column;

      const options  = FIIs.map(FII => String(FII[column.key]));

      const filteredOptions = options
                                .filter((option, index) => options.indexOf(option) === index)
                                .map(option => {
                                  return {
                                    key: Math.ceil(Math.random() * 1000),
                                    value: option
                                  }
                                });
      return {
        ...column,
        selectOptions: filteredOptions
      }
    }));
  }, [ FIIs ]);

  function handlePrevPage() {
    if (currentPage > 1)
      setCurrentPage(currentPage - 1);
  }

  function handleNextPage() {
    if (currentPage < numberOfPages)
      setCurrentPage(currentPage + 1);
  }

   /* Shows just 'Ticker' and 'Variação no Dia' on mobile */

   useEffect(() => {
    if (isMobile) {
      setColumns(columns.map(column => {
        if (['ticker', 'variacao_dia', 'favoritar'].includes(column.key))
          return column;
        else
          return {
            ...column,
            visible: false
          }
      }));
    }
  }, [ isMobile ]);

  /* Control of table options visibility */

  const [ showSortOptions, setShowSortOptions ]     = useState<boolean>(false),
        [ showViewOptions, setShowViewOptions ]     = useState<boolean>(false),
        [ showFilterOptions, setShowFilterOptions ] = useState<boolean>(false);

  /* Update state */

  const [ updateDatetime, setUpdateDatetime ] = useState<string>('2020-06-10 12:00:00');

  /* Render */

  return (
    <div id="container">
      <div
        className={
          [
            'overlay',
            showSortOptions || showViewOptions || showFilterOptions ? 'active' : '_no_active'
          ].join(' ').trim()
        }
        onClick={
          e => {
            setShowSortOptions(false);
            setShowViewOptions(false);
            setShowFilterOptions(false);
          }
        }
      />
      <header>
        <div>
          <a href="https://www.carteiraglobal.com/">
            <img src={ require('../../assets/logo.png') } alt="carteira global" />
          </a>
          <h1>Ranking de Fundos de Investimentos Imobiliários (FIIs)</h1>
        </div>
      </header>
      <section>
        <div id="options">
          <div>
            {
              !isMobile && (
                <OptionButton active={showSortOptions}>
                  <div onClick={ () => setShowSortOptions(!showSortOptions) } >
                    <MdImportExport size={17} />
                    Ordenar por&nbsp;<strong>{ columns.filter(column => column.sort.byThis)[0].name }</strong>
                  </div>
                  <div className="dropdown fadedOptions">
                    <span onClick={ () => setShowSortOptions(false) }><FiX /></span>
                    <div className="columns">
                      {
                        [0, 5, 10].map(item => (
                          <ul className="column" key={ item }>
                            {
                              columns.slice(item, item + 5).map(column => (
                                <li key={ column.id } className={ column.sort.byThis ? 'active' : '' } onClick={ e => toggleSortKey(column) } >
                                  <span>{ column.name } { column.sort.byThis && (column.sort.asc ? <small className="active">crescente</small> : <small>decrescente</small>) }</span>
                                </li>
                              ))
                            }
                          </ul>
                        ))
                      }
                    </div>
                    <footer>
                      <span><FiHelpCircle /> Selecione uma das colunas acima para ordenar a tabela.</span>
                      <span><FiHelpCircle /> Clique novamente na coluna de ordenação para inverter a ordem.</span>
                    </footer>
                  </div>
                </OptionButton>
              )
            }
            {
              !isMobile && (
                <OptionButton active={showViewOptions} >
                  <div onClick={ () => setShowViewOptions(!showViewOptions) }>
                    <FiLayers size={16} />
                    Exibir <span className="badge">{ columns.filter(column => column.visible).length === columns.length ? 'Todos' : columns.filter(column => column.visible).length }</span>
                  </div>
                  <div className="dropdown fadedOptions">
                    <span onClick={ () => setShowViewOptions(false) }><FiX /></span>
                    <div className="columns">
                      {
                        [0, 5, 10].map(item => (
                          <ul className="column" key={ item }>
                            {
                              columns.slice(item, item + 5).map(column => (
                                <li key={ column.id }>
                                  <div>
                                    <label>
                                      <Toggle
                                        defaultChecked={ column.visible }
                                        icons={ false }
                                        onChange={ () => toggleVisibility(column) } />
                                      <span>{ column.name }</span>
                                    </label>
                                  </div>
                                </li>
                              ))
                            }
                          </ul>
                        ))
                      }
                    </div>
                    <footer>
                      <span>Exibindo <input type="number" min={1} max={ numberOfFilteredResults } step={1} value={ itemsPerPage } onChange={ e => setItemsPerPage(e.target.value as unknown as number) } /> resultados por página</span>
                    </footer>
                  </div>
                </OptionButton>
              )
            }
            <OptionButton active={showFilterOptions} >
              <div onClick={ () => setShowFilterOptions(!showFilterOptions) }>
                <FiFilter size={16} />
                Filtros
              </div>
              <div className="dropdown">
              <span onClick={ () => setShowFilterOptions(false) }><FiX /></span>
              <div className="columns">
                  {
                    [0, 5, 10].map(item => (
                      <ul className="column" key={ item }>
                        {
                          columns.slice(item, item + 5).map(column => {
                            if (!isMobile || (isMobile && ['ticker', 'variacao_dia', 'favoritar'].includes(column.key))) {
                              return (
                                <li key={ column.id }>
                                  <span>
                                    { column.name }
                                  </span>
                                  <div>
                                    {
                                      column.type === 1 && (
                                        <CustomSelect
                                          options={ column.selectOptions || [] }
                                          selectedOptions={ column.selectOptions || [] }
                                          onChange={ e => setFilter(column, e) }
                                        />
                                      )
                                    }
                                    {
                                      column.type === 2 && column.slider && (
                                        <CustomSlider
                                          domain={ column.slider.domain }
                                          step={ column.slider.step }
                                          onChange={ e => setFilter(column, e) }
                                          format={ column.slider.format }
                                        />
                                      )
                                    }
                                    {
                                      column.type === 3 && (
                                        <label>
                                          <Toggle
                                            defaultChecked={ false }
                                            icons={ false }
                                            onChange={ e => setFilter(column, e.target.checked) } />
                                          <span>Apenas favoritos</span>
                                        </label>
                                      )
                                    }
                                  </div>
                                </li>
                              );
                            }
                          })
                        }
                      </ul>
                    ))
                  }
                </div>
                <footer>
                  <span>Exibindo { numberOfFilteredResults } resultados compatíveis com seus critérios.</span>
                </footer>
              </div>
            </OptionButton>
          </div>
          <div>
            <OptionButton hoverEffect={true}>
              <div>
                <FiArrowLeft size={18} onClick={ handlePrevPage } />
                Página { currentPage } de { numberOfPages }
                <FiArrowRight size={18} onClick={ handleNextPage } />
              </div>
            </OptionButton>
          </div>
        </div>
        <div id="tableContainer">
          <table>
            <thead>
              <tr>
                {
                  columns.filter(column => column.visible).map(column => (
                  <th key={ column.id } className={ column.sort.byThis ? 'active' : '' } onClick={ e => toggleSortKey(column) } >{ column.name } { column.sort.byThis ? (column.sort.asc ? <FiArrowDown /> : <FiArrowUp />) : ''}</th>
                  ))
                }
              </tr>
            </thead>
            <tbody>
              {
                currentPageFIIs.map(FII => (
                  <tr key={ FII.id }>
                    {
                      columns.filter(column => column.visible).map(column => (
                        <td
                          className={ column.sort.byThis ? 'active' : '' }
                          key={ column.id }
                        >
                          { column.type === 2 && column.slider ? column.slider.format(FII[column.key] as unknown as number) : FII[column.key] }
                          { column.type === 3 && (
                            FII[column.key]
                              ? <MdStar className="active" size={24} />
                              : <MdStarBorder size={24} title="Favoritar..." />
                          ) }
                        </td>
                      ))
                    }
                  </tr>
                ))
              }
              {
                currentPageFIIs.length === 0 && (
                  <tr>
                    <td colSpan={ columns.filter(column => column.visible).length }>Nenhum resultado para exibir :(</td>
                  </tr>
                )
              }
            </tbody>
          </table>
        </div>
      </section>
      <footer>
        <span className="updates">
          Tabela atualizada em&nbsp;<strong>{ Intl.DateTimeFormat('pt-BR', { timeZone: 'America/Sao_Paulo' }).format(new Date(updateDatetime)) }</strong>&nbsp;às&nbsp;<strong>{ Intl.DateTimeFormat('pt-BR', { timeZone: 'America/Sao_Paulo', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(new Date(updateDatetime)) }</strong>
        </span>
      </footer>
    </div>
  );
};

export default Home;