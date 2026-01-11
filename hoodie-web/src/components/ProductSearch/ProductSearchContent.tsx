/**
 * @author duynguyen © 2025
 */
import { useEffect } from "react";
import { Accordion, AccordionDetails, AccordionSummary, Box, Card, CardContent, CardMedia, CircularProgress, Container, Divider, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, Typography } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TuneIcon from '@mui/icons-material/Tune';
// import { CommandBar } from "@fluentui/react";
import type { PageProps } from "./ProductSearch.types";
import { useStore } from "./ProductSearchStore";
import Image from "../../templates/Image";

/**
 * ProductSearchContent
 * 
 * @param props 
 * @returns ProductSearchContent
 */
export const ProductSearchContent: React.FC<PageProps> = props => {
    const { t, state, action } = useStore(props);

    useEffect(() => {
        action.load();
    }, []);

    if (state.loading) {
        return <CircularProgress />
    }

    return (
        <>
            {/* <CommandBar items={state.ribbonItem} /> */}

            <Box sx={{ mx: 3, display: "flex" }}>
                <Box sx={{ width: "30%" }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'gray', fontWeight: 'bold' }}>
                        <Typography sx={{ display: 'flex', justifyContent: 'center' }}><TuneIcon sx={{ mr: 1 }} />{t("label-filter")}</Typography>
                        <Typography sx={{ display: 'flex', justifyContent: 'center' }}>{state.productSearchDomainModel?.info?.total! || 0} {t("label-results")}</Typography>
                    </Box>
                    <Divider sx={{ my: 1, fontWeight: 'bold' }} />
                    {/* category */}
                    <Accordion defaultExpanded>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}>
                            <FormLabel id="category-check-radio">{t("label-category")}</FormLabel>
                        </AccordionSummary>
                        <AccordionDetails>
                            <FormControl>
                                <RadioGroup
                                    aria-labelledby="category-check-radio"
                                    defaultValue=""
                                    name="category-check-radio"
                                    onChange={action.items.category.onChange}
                                >
                                    {state.categorySearchDomainModel?.search && state.categorySearchDomainModel.search.length > 0 ? (
                                        state.categorySearchDomainModel.search.map((item) => (
                                            <FormControlLabel key={item.categoryId} value={item.categoryId} control={<Radio />} label={item.categoryName} />
                                        ))
                                    ) : (
                                        <Typography sx={{ display: 'flex', justifyContent: 'center' }}>{t('label-noCategory')}</Typography>
                                    )}
                                </RadioGroup>
                            </FormControl>
                        </AccordionDetails>
                    </Accordion>
                    {/* color */}
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <FormLabel id="category-check-radio">{t("label-color")}</FormLabel>
                        </AccordionSummary>
                        <AccordionDetails>
                            <FormControl>
                                <RadioGroup
                                    aria-labelledby="color-check-radio"
                                    defaultValue=""
                                    name="color-check-radio"
                                    onChange={action.items.color.onChange}
                                >
                                    <FormControlLabel value={1} control={<Radio />} label="green" />
                                    <FormControlLabel value={2} control={<Radio />} label="black" />
                                    <FormControlLabel value={3} control={<Radio />} label="white" />
                                </RadioGroup>
                            </FormControl>
                        </AccordionDetails>
                    </Accordion>
                    {/* size */}
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <FormLabel id="size-check-radio">{t("label-size")}</FormLabel>
                        </AccordionSummary>
                        <AccordionDetails>
                            <FormControl>
                                <RadioGroup
                                    aria-labelledby="size-check-radio"
                                    defaultValue=""
                                    name="size-check-radio"
                                >
                                    <FormControlLabel value="X" control={<Radio />} label="X" />
                                    <FormControlLabel value="M" control={<Radio />} label="M" />
                                    <FormControlLabel value="L" control={<Radio />} label="L" />
                                </RadioGroup>
                            </FormControl>
                        </AccordionDetails>
                    </Accordion>
                    {/* price */}
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <FormLabel id="price-check-radio">{t("label-price")}</FormLabel>
                        </AccordionSummary>
                        <AccordionDetails>
                            <FormControl>
                                <RadioGroup
                                    aria-labelledby="price-check-radio"
                                    defaultValue=""
                                    name="price-check-radio"
                                >
                                    <FormControlLabel value="X" control={<Radio />} label="0 - 200.000" />
                                    <FormControlLabel value="M" control={<Radio />} label="200.000 - 500.000" />
                                    <FormControlLabel value="L" control={<Radio />} label="500.000 - 1.000.000" />
                                    <FormControlLabel value="XL" control={<Radio />} label="> 1.000.000" />
                                </RadioGroup>
                            </FormControl>
                        </AccordionDetails>
                    </Accordion>
                </Box>
                {/* product */}
                <Container maxWidth={false} sx={{ py: 4 }}>
                    <Grid container spacing={1}>
                        {state.productSearchDomainModel?.search && state.productSearchDomainModel.search.length > 0 ? (
                            state.productSearchDomainModel.search.map((item) => (
                                <Grid key={item.productId} size={3}>
                                    <Card
                                        sx={{
                                            height: "100%",
                                            display: "flex",
                                            flexDirection: "column",
                                            cursor: "pointer",
                                            transition: "transform 0.2s",
                                            "&:hover": { transform: "scale(1.03)" },
                                        }}
                                    >
                                        <CardMedia>
                                            <Image
                                                loading="lazy"
                                                alt={`alt-image-product-${item.productId}`}
                                                src={item.primaryImageUrl!}
                                                srcSet={item.primaryImageUrl!}
                                                width={0}
                                                height={0}
                                                sizes="100vw"
                                                style={{
                                                    width: "100%",
                                                    height: "300px",
                                                    objectFit: "cover",
                                                }}
                                            />
                                        </CardMedia>
                                        <CardContent sx={{ flexGrow: 1 }}>
                                            <Typography gutterBottom variant="h6" component="div">
                                                {item.productName}
                                                <Typography gutterBottom variant="h6" component="div" sx={{color: 'gray', fontSize: '14px'}}>
                                                    {item.categoryName}
                                                </Typography>
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {`${t('label-price')}:`} {item.displayPrice}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))
                        ) : (
                            <Grid size={12}>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        textAlign: "center",
                                        width: "100%",
                                        py: 8,
                                        color: "text.secondary",
                                    }}
                                >
                                    {t("label-noProduct")}
                                </Typography>
                            </Grid>
                        )}
                    </Grid>
                </Container>
            </Box>
        </>
    );
};