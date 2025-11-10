import { Separator } from "../shared/Separator"
import { FilterCheckbox } from "../filters/FilterCheckbox"
import { FilterSection } from "../filters/FilterSection"
import { useFilters } from "../../context/FilterContext"

const formasDisponibles = ['Circulares', 'Cuadrada'];
const tamaniosDisponibles = ['Grande', 'Pequenia'];

export const ContainerFilter = () => {
    const { filters, toggleForma, toggleTamanio, clearFilters } = useFilters();
    
    const hasActiveFilters = filters.formas.length > 0 || filters.tamanios.length > 0;

    return (
        <div className="p-5 border border-slate-200 rounded-lg h-fit col-span-2 lg:col-span-1">
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-xl">
                    Filtros
                </h3>
                {hasActiveFilters && (
                    <button
                        onClick={clearFilters}
                        className="text-sm text-rose-600 hover:text-rose-700 font-medium"
                    >
                        Limpiar
                    </button>
                )}
            </div>

            <Separator />

            <div className="space-y-6">
                {/* Filtro por Forma */}
                <FilterSection title="Forma">
                    {formasDisponibles.map(forma => (
                        <FilterCheckbox
                            key={forma}
                            label={forma}
                            checked={filters.formas.includes(forma)}
                            onChange={() => toggleForma(forma)}
                        />
                    ))}
                </FilterSection>

                <Separator />

                {/* Filtro por Tamanio */}
                <FilterSection title="Tamanio">
                    {tamaniosDisponibles.map(tamanio => (
                        <FilterCheckbox
                            key={tamanio}
                            label={tamanio}
                            checked={filters.tamanios.includes(tamanio)}
                            onChange={() => toggleTamanio(tamanio)}
                        />
                    ))}
                </FilterSection>
            </div>
        </div>
    );
};