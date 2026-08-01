/**
 * @author duynguyen © 2025
 */
import { useEffect, useMemo, useRef, useState } from "react";
import { useApplicationContext } from "../../../hooks/useApplicationContext";
import { useTranslation } from "../../../hooks/useTranslation";
import type { PageProps, PageState } from "./RevenueSearch.types";
import type { RevenueByDate, RevenueRange } from "../../common/Models";
import { RevenueSearchViewApi } from "../../api/RevenueSearchViewApi";

/**
 * useStore
 * 
 * @param props 
 * @returns useStore
 */
export const useStore = (props: PageProps) => {
    const { t } = useTranslation();
    const context = useApplicationContext();
    // const params = useAppParameters();
    // const navigate = useNavigate();
    // const [searchParams] = useSearchParams();
    // const { pathname } = useLocation();

    const [state, setState] = useState<PageState>({
        revenueSearchDomainModel: undefined,
        loading: true,
        dateRange: '30days',
    });

    const stateRef = useRef(state);
    useEffect(() => {
        stateRef.current = state;
    }, [state]);

    const action = useMemo(() => ({
        load: async (range: PageState['dateRange'] = '30days') => {
            await context.overlay.open().execute(async () => {
                setState(prev => ({ ...prev, loading: true, dateRange: range }));

                const result = await new RevenueSearchViewApi().search({ range });
                console.log(result);
                const revenueByDate = action.fillMissingDate(
                    result.revenueByDate!,
                    range
                );

                setState(prev => ({
                    ...prev,
                    loading: false,
                    dateRange: range,
                    revenueSearchDomainModel: {
                        ...result,
                        revenueByDate
                    }
                }));
            });
        },
        changeDateRange: (range: PageState['dateRange']) => {
            action.load(range);
        },
        fillMissingDate(
            data: RevenueByDate[],
            range: RevenueRange
        ): RevenueByDate[] {
            if (!data || data.length === 0) {
                return [];
            }
            const map = new Map<string, RevenueByDate>();
            data.forEach(item => {
                map.set(item.date, item);
            });
            const result: RevenueByDate[] = [];
            const start = new Date(data[0].date);
            const end = new Date(data[data.length - 1].date);
            for (
                const d = new Date(start);
                d <= end;
                d.setDate(d.getDate() + 1)
            ) {
                const key = d.toISOString().substring(0, 10);
                result.push(
                    map.get(key) ?? {
                        date: key,
                        revenue: 0,
                        orders: 0
                    }
                );
            }
            return result;
        },
        formatCurrency(value: unknown): string {
            const amount = Number(value);
            if (Number.isNaN(amount)) {
                return "0 ₫";
            }
            return new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
                maximumFractionDigits: 0
            }).format(amount);
        }
    }), []);

    return {
        t,
        state,
        action
    };
};