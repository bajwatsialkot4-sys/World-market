import { Product, Customer, Currency, Language, SellerInfo, BlogPost, SaleRecord } from './types';

export const ADMIN_WHATSAPP = "923187536795"; 
export const ADMIN_EMAIL = "worldmarketsupport@gmail.com";
export const SUPPORT_EMAIL = "worldmarketsupport@gmail.com";
export const ADMIN_EMAILS = [
  "sportsarslan199@gmail.com",
  "worldmarketsupport@gmail.com"
]; 

export const CURRENCIES: Currency[] = [
  { code: 'USD', symbol: '$', rate: 1, name: 'United States Dollar' },
  { code: 'EUR', symbol: '€', rate: 0.92, name: 'Euro' },
  { code: 'GBP', symbol: '£', rate: 0.79, name: 'British Pound' },
  { code: 'AED', symbol: 'د.إ', rate: 3.67, name: 'UAE Dirham' },
  { code: 'CAD', symbol: 'C$', rate: 1.36, name: 'Canadian Dollar' },
];

export const LANGUAGES: Language[] = [
  { code: 'en', name: 'English', flag: '🇺🇸', dir: 'ltr' },
  { code: 'ar', name: 'Arabic', flag: '🇦🇪', dir: 'rtl' },
  { code: 'fr', name: 'French', flag: '🇫🇷', dir: 'ltr' },
  { code: 'es', name: 'Spanish', flag: '🇪🇸', dir: 'ltr' },
  { code: 'de', name: 'German', flag: '🇩🇪', dir: 'ltr' },
];

export const CATEGORIES = [
  "hoodie", 
  "tshirt", 
  "jacket", 
  "shoes", 
  "cap", 
  "shorts", 
  "jersey",
  "tracksuit",
  "electronics",
  "books",
  "footwear"
];

export const SHIPPING_COUNTRIES = [
  "United States", "United Kingdom", "United Arab Emirates", "Germany", "France", "Spain", "Canada", "Australia", "Japan"
];

export const SELLERS: SellerInfo[] = [
  {
    id: 'seller-1',
    fullName: 'Global Logistics Hub',
    whatsapp: '923187536795',
    email: 'worldmarketsupport@gmail.com',
    country: 'United States',
    city: 'New York',
    contactNumber: '+1 (555) 000-0000',
    paymentDetails: 'International Bank Transfer / Stripe',
    showName: 'globalhub',
    rank: 'Platinium',
    rating: 5.0,
    totalSales: 5000,
    responseTime: '< 15 mins',
    isVerified: true,
    verificationStatus: 'Verified',
    businessType: 'Enterprise',
    joinedDate: '2023-01-01'
  },
  {
    id: 'seller-2',
    fullName: 'Elite Apparel Co.',
    whatsapp: '923001234567',
    email: 'elite@worldmarket.com',
    country: 'United Arab Emirates',
    city: 'Dubai',
    contactNumber: '+971 50 123 4567',
    paymentDetails: 'Bank Transfer / IBAN',
    showName: 'eliteapparel',
    rank: 'Silver',
    rating: 4.2,
    totalSales: 450,
    responseTime: '< 4 hours',
    isVerified: true,
    verificationStatus: 'Verified',
    businessType: 'Business',
    joinedDate: '2023-06-20'
  },
  {
    id: 'seller-3',
    fullName: 'Starter Promoter',
    whatsapp: '923009876543',
    email: 'starter@worldmarket.com',
    country: 'United Kingdom',
    city: 'London',
    contactNumber: '+44 20 1234 5678',
    paymentDetails: 'PayPal',
    showName: 'starterpromo',
    rank: 'Standard',
    rating: 4.0,
    totalSales: 50,
    responseTime: '< 24 hours',
    isVerified: true,
    verificationStatus: 'Verified',
    businessType: 'Individual',
    joinedDate: '2024-01-10'
  }
];

const HOODIE_IMAGES = [
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774287022/ACL-SRC-Hoodie-VB-Front-Neu2_chqbgd.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774287021/474fdd8a236c8d920ab4456eef014a1715d3eb1c_nyr2qd.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774287022/Black_iotwtx.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774287022/CPM253FH62_RG73-FRONT_2f2fae4d-7af0-435d-8ad3-24db03ad3d18_sbxp0r.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774287022/Hero_Flat_69b6bd83-b897-4b28-b2cc-cc7216a56200_320x_zjegnf.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774287020/U3032RG_01_b1_s1_a4_1_m221_750x_wmdrzb.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774287017/U3041RG_02910_b1_s1_a1_1_m221_ac16ee33-cca6-49c6-b5bd-d433415809b4_750x_vugbr4.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774287021/men_hoodies_lqoylr.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774287020/U3041RG_01_b1_s1_ai_1_m221_750x_wvdz6b.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774287021/12858_a9ef474f36-13497-069-1-1350x0_hedx7x.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774287018/images-CrestOversizedHoodieGSNavyA5A8O_UB9P_1763_k8n6m7.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774287020/image_zyeqzb.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774287020/U3031RG_01_b1_s1_a4_1_m91_750x_y5j7gn.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774287020/N77918s_selz8t.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774287020/Cafe_Heather_Hoodie_PDP_1_1500x_h1qiqk.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774287018/glossier-creamhoodie-carousel-01_j3jyz9.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774287018/U3032RG_03842_b1_s1_a1_1_m191_8540a875-96ee-455c-87a7-648d0714dfd2_750x_snspeq.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774287018/AlmondButterCrunchCups_4_v2mupr.png",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774287018/grey-corretc-size--1000x1250_xap5vk.webp",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774287019/61tZ3LZNpeL._AC_UY1000__r7ag3v.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774287018/U3031RG_02910_b1_s1_a1_1_m214_fdd08ec7-7b16-484f-a688-7fcf7743f28e_750x_c3wbay.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774287017/OTHV-Stone_Legend-Hoodie_Main_lcc4bp.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774363305/5f27083867086f4bdaa18522900def68a8ae3243_iqapon.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774363343/1925000_BLAC_2_c7491c5c-c6fa-45f9-9727-9d3516e067f8_j2ejcf.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774363344/W3550RG_02910_b1_s1_a1_1_m242_750x_qjgl6g.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774363345/12877_9da46b54e3-13514-084-1-1350x0_tada4x.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774363353/25137878_55308523_600_pygai1.webp",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774363302/M_NL_SOLO_SWSH_BB_PO_HOODIE_u1v5j7.png",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774363303/var_hdm-blk-8_x0qnsu.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774363303/4eed5c1a69191639372a69e3344eb154dbd59259_hjuvst.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774363304/grey_hoodie_new_egqslc.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774363305/hoodief_w4obj3.png",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774363277/oversize-hoodie-darksome-ed-sport-grey-456586_n9ishx.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774363278/MensHeavyweightHoodie-Shiitake_Front_qzfhqu.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774363278/ootdsupply-1732-8510774-1_eimhri.webp",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774363279/Tandem-Red-Hoodie3_f40a6g.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774363302/cotton-on-4726-3020833-1_oyxfll.webp",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774363241/PRO-H-MCL-128-1_r10wyp.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774363240/ab-essential-hoodie-slate-front-10005558_zdgo8j.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774363244/635f8b0d76826441dc3dbdf3-gylazhuziz-hoodies-men-vintage_yvmpna.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774363277/U3031RG_01_b1_s1_a1_1_m91_1024x1024_jch0pa.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774363235/hoodie-camber-usa-green-vert_jt6cdu.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774363237/M_NL_SOLO_SWSH_BB_PO_HOODIE_hlqdl6.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774363239/Beginning-Pink-Lovey-Bubble-Hoodie-1_d9b09cee-d761-4b3f-a5df-dda0043513fb_oguhuw.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774363241/Unisex_LUX_Oversized_Hoodie_Black_Wash_front_ulux9h.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774363241/1925000_NAVY_2_4ceaa24f-cc1a-4171-a7e2-b08de4fd0f3f_topouk.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774363201/charcoal_e1ae98e2-38bc-4220-9859-3a1049571183_hfqv8x.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774363200/CrestHoodieLightGreyMarlA2A4G-GBFG2_c569d2c6-eacb-4aa5-a388-9701a9efc524_mrvsip.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774363200/1925000_ASHH_2_emjdqz.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774363201/5E3D37FB-B164-410F-BAC4-AAE6C4E942C9_x5lbvl.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774363207/25137878_55308523_600_i8zzz4.webp",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774363185/4M6A0227_apawoo.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774363185/1925000_BLAC_2_c7491c5c-c6fa-45f9-9727-9d3516e067f8_jspvxn.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774363186/W3550RG_02910_b1_s1_a1_1_m242_750x_x2jywr.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774363199/12877_9da46b54e3-13514-084-1-1350x0_vmzgyl.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774363199/U3031RG_01_b1_s1_a1_1_m91_930x_pocsq8.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774363152/var_hdm-blk-8_x3rmss.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774363153/4eed5c1a69191639372a69e3344eb154dbd59259_li5z5h.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774363170/grey_hoodie_new_for6oy.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774363170/5f27083867086f4bdaa18522900def68a8ae3243_lspuv7.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774363171/hoodief_mndmaw.png",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774363107/1925000_NAVY_2_4ceaa24f-cc1a-4171-a7e2-b08de4fd0f3f_xdqalf.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774363109/635f8b0d76826441dc3dbdf3-gylazhuziz-hoodies-men-vintage_bmy1nj.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774363122/oversize-hoodie-darksome-ed-sport-grey-456586_pgmsgz.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774363123/MensHeavyweightHoodie-Shiitake_Front_nxjlsy.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774363123/ootdsupply-1732-8510774-1_eib1as.webp",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774363058/M_NL_SOLO_SWSH_BB_PO_HOODIE_ibequc.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774363058/ab-essential-hoodie-slate-front-10005558_ehnh7w.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774363061/25137878_55308523_600_mcu0oh.webp",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774363058/Beginning-Pink-Lovey-Bubble-Hoodie-1_d9b09cee-d761-4b3f-a5df-dda0043513fb_elh176.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774363106/PRO-H-MCL-128-1_dvnmvs.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774363056/U3031RG_01_b1_s1_a1_1_m91_930x_jmaxgb.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774363056/1925000_ASHH_2_awzeqi.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774363057/5E3D37FB-B164-410F-BAC4-AAE6C4E942C9_txwado.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774363057/CrestHoodieLightGreyMarlA2A4G-GBFG2_c569d2c6-eacb-4aa5-a388-9701a9efc524_mnzjin.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774363057/12877_9da46b54e3-13514-084-1-1350x0_lnezgi.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774362958/Go_through_front_q4uequ.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774287015/10007-BLK_1_1_2048x_l9n4fu.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774287016/Go_through_front_amptmx.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774287017/U3032RG_01_b1_s1_a1_1_m221_1024x1024_a8rnut.jpg"
];

const OVERSIZED_HOODIE_IMAGES = [
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773942834/Go_through_front_llk2gk.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773942834/25-dark-gray-gianthoodies-giant-hoodie_f3313de6-dd66-460b-8d83-fa12d3a85f92_occlb0.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773942834/AR7622s_ilzqzj.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773942834/2011WbeigeD-1_800x_ttzwcb.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773942835/cn59629253_rtbyr2.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773942762/1_882657e6-a33f-4a63-b850-ad126c1ad3f5_nz4qse.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773942764/26732298_56406973_600_mkvtbr.webp",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773942833/IMG_9166_caa4wr.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773942833/M_NK_TCH_FLC_HOODIE_xq3vzy.png",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773942616/pole-star-oversized-hoodie-for-women_1_guldf1.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773942616/USW051JB-5_tgtmhl.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773942738/gray-goth-oversized-hoodie_mlwsyc.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773942754/ALWAYS_SHINING_OVERSIZED_HOODIE_ALWAYS_SHINING_SWEATPANTS_13.12.24_02_si86xb.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773942760/cn59629249_tylkvg.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773942534/0793601600162NEW_00_367_ovi8c9.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773942615/heavyweight-oversized-hoodie-lime-green_mbmkas.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773942615/MH29108-BLK-1_211d3dbf-ea64-4383-b7cd-0eedaafdf72b_i0ea6u.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773942616/USW051JB-5_yh6blx.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773942616/disney-x-lululemon-fleece-oversized-hoodie-lip-gloss-028936-490855_a44ohe.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773942454/0790601600269NEW_00_004_f4pleb.webp",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773942531/white-fox-from-the-archives-lexi-oversized-hoodie-charcoal.ghost.01_2560x.progressive_cmeckc.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773942531/dbd890a46f1c8038ee9878ccab1f8d7e4a2700fe_dszaob.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773942533/images-CrestOversizedHoodieGSNavyA5A8O_UB9P_1757_qj5mne.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773942453/KIC_352-5174-00289-112_model1_x8xhpa.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773942453/images-CrestOversizedHoodieLightGreyMarlA5A8O_GCHR_1097_0486_p8khgg.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773942453/07.05.2025_Womens0376_vn7eiu.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773942454/51_HC-X7PGL._AC_UY1000__uaoz98.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773942143/NYC86BRANDD-1_96daea41-488e-4e34-a400-2e30f1c43b7e_800x_nhnmje.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773942144/images-CrestOversizedHoodieBlackA5A8O_BB2J_1134_0494_si2oui.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773942144/IdrisBlack2_aeeae50e-fcab-423a-84c4-c858b46eb7ff_800x_m3oeee.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773942144/71EMXD4x3aL._AC_UY1000__h4fcjl.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773942213/images-PowerSeasonalsHoodieGSBlackACIDWASHSMALLBALLB4C5F_BB4V_0503_V1_otfpuo.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773942049/PGDR_MOST-ALIVE-ECOMMERCE_MENS_DAY-152560_e87c41d2-a3ca-41b4-9e53-ece79a87c3af_fbdkl5.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773942049/2012XBLACKLEADD_800x_oborqh.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773942050/minimalist-sleeve-printed-white-oversized-hoodie_yfajbz.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773942050/1.MenEssentialOversizedHoodie-WashedGrey_rtvbjm.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773942051/2-2_qjphuv.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773942049/09.01.20250965_n5w0yv.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773941926/61MLg4iyzCL._AC_UY1000__ourwdi.jpg"
];

const TRACKSUIT_IMAGES = [
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1770780568/superstar-firozi-and-navy-scaled_ilhzar.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1770780565/set-design-dept-tracksuit-1.224.20.01-000000-fullbody-04_f6xdrw.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1770780565/M_NK_CLUB_PK_TRK_SUIT_npejt8.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1770780564/bded68cd-7c03-43c6-affb-fbcfd593b2071681468037192-ADIDAS-Men-Tracksuits-3851681468036045-1_noiusc.webp",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1770780564/aefa39b6c0f6ec9974f76efba34e177c0e8acce2_VENUM_05299_004_G_1_unhc9h.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1770780539/K_NK_DF_ACD25_TRACK_SUIT_K_-PD_yp4brx.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1770780539/TA-CZIPHOOD01-W-BL_TA-CWJOG01-W-BL-13_vw3ruc.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1770780544/ac9d6b51-c0d0-49b9-bb1d-1bddfb6591b21732339636335-ADIDAS-Women-Tracksuits-5251732339635628-1_ukqvuu.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1770780544/WINE-VELVET-TWIN-SIDE-STRIPE-HOODED-SKINNY-TRACKSUIT-11.jpg_fcgv2j.webp",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1770780564/ruched-sleeve-cropped-grey-tracksuit-styledup-fashion_gih769.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1770780437/womens-designer-tracksuit-luxury-tracksuit-antoninias-2-29774180417780_t70dgp.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1770780487/Black-Winter-Tracksuit-For-men_mdfi4k.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1770780487/110005366_LIQUORICE_3_06bad7ca-addb-412d-ba0d-085bb938ae79_agmrnd.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1770780487/7779f63e-f34d-49d2-b92d-060564cc13b5.cc498afed33613c2d2a62beffc086645_kwxr4p.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1770780488/IMG_0141_JPG_y3hlxg.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1770780383/915625s_dkibap.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1770780384/27805864_1200_B_atbjes.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1770780384/D36887s_gzztwd.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1770780387/SeaGreenCoordSet_yeehaq.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1770780335/LP_-715_tgbjnx.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1770780357/ultralight_tracksuit_set_01_2_da893o.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1770780368/M_NK_CLUB_WVN_TRK_SUIT_cgeoxv.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1770780383/68593905023438e95303bf63-tbmpoy-mens-tracksuits-sweatsuits-for_i8jvnz.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1770780334/250px-Jude_Bellingham_during_an_EA_Sports_event_in_September_2024_2_tlfpuh.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1770780334/womens-designer-tracksuit-luxury-tracksuit-antoninias-1-29774180352244_vyxl7y.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1770780335/yUBQ1W0qYS5TY1h2nRN_AbiJahShGz-eiiO-AmZFiAg_io8hha.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1770780335/LP_-715_tgbjnx.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1770780357/ultralight_tracksuit_set_01_2_da893o.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1770780304/AS_M_NK_CLUB_PK_TRK_SUIT_rzwccm.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1770780307/B5BYSqG1Wi_7IwW4xyFiycnSo6XF8762LO7PN-UCeHQ_t0idvb.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1770780333/100250911_F_Model_eCom_yngixz.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1770780333/Nextage-navy_bluetracksuit-mens_be57u3.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1770780334/AS_M_NK_CLUB_WVN_TRK_SUIT_u6tehf.png",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1770780303/VG-NVRHO32CJ-W_VG-NVRJO33CJ-W-P-S-44_5bbfc92e-956e-4f83-8f4f-b3662a5a0918_kbnmmu.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1770780304/227090-6195_A_nwasrj.png",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1770780304/91w5WFHdRCL_mj19gw.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1770780304/M_NRG_NOCTA_CS_PANT_FLC_OH_dhs60f.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1770780304/AS_M_NK_CLUB_PK_TRK_SUIT_rzwccm.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1770780263/102.181992_80013_00_HR_vjg0it.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1770780263/xTV7O0lxB3NjTub2zVGhF0usvyQZubVKVc6jKGBMyy4_twdqsd.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1770780264/102.180957_60024_10_HR_msy2gj.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1770780264/c42cf4bff71d46c9ab1ad1c8a1e5c3ce_zhuw1w.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1770780303/SH-MAYTRKJK02-W-GR_SH-WTRACKP-W-G-12_9a1af220-420c-4b57-968a-42f61c51ffe9_ylzyho.jpg"
];

const POLO_IMAGES = [
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772096678/NavyBlueCPModel_7826c75b-86ce-4ab0-8d44-4540c2c0e4e4_jiakte.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772096713/0922-KN-BPOLO-176-23_1_gwqcab.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772096713/2240101914-19-38_1_j9te4j.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772096713/11390304-WHIT_srvwsv.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772096714/-473Wx593H-410456774-wht-MODEL_uongow.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772096676/67e0d3b7bd774b5a6c68cfd0-button-down-t-shirts-for-mens-polo_hfnzsl.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772096677/U-S-Polo-Assn-Men-s-Short-Sleeve-Crew-T-Shirt_b4b79b71-4740-49e6-9604-dd3f02e690d8.6cd8285b5c3adce8062b5aa8f6fa1968_ipo3e2.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772096677/7_a4d3182c-987e-4147-aba4-cdd044567da3_kudmgf.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772096677/5_vJgp79x_lkulmv.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772096677/1_71340bc5-9984-4f82-8028-ea2fe0bf70c0_ibzvuu.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772096645/d6373c_cc49130c5df6485884724e15c855dc46_mv2_atj7yz.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772096646/WUTS1125S_1_foyscf.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772096646/blank-collared-shirt-mock-up-template-front-and-back-view-plain-white-t-shirt-isolated-on_zxktau.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772096648/black-ash_w5y4wb.webp",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772096652/white-polo-shirt-mockup-png_u8pt23.png",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772096623/6209244-HQ154602-SPWIN24130424_01-2100_vmz74x.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772096623/202303-2210-468-model-fv-1_4b5f4fe7-abcd-453d-945a-50aed27f323b_o85bev.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772096623/plp-header-polo-men-02_xtghoy.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772096623/TS-11-1_bjy4zu.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772096623/26816077_56536485_600_iajrvl.webp",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772096596/polo-shirt-illustration-template-front-and-back-views-apparel-polo-t-shirt-mock-up-cad-free-vector_c4qlt4.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772096596/nologo-navy-pure-cotton-polo-t-shirt_oopogq.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772096596/polo-t-shirt-559323_zvzuew.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772096622/outfmvch-polo-shirts-for-men-male-summer-solid-print-t-shirt-turn-down-collar-short-sleeve-t-shirt-womens-tops-grey_fd5b3fa8-56d4-40a7-8b6f-ec1307b752ab.b1927c945864aa1de64664f019e9205f_c0fj7m.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772096565/blank-black-t-shirt-template-front-and-back-view_i3i1ul.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772096573/28909-2830-AW24-F-20_oa4scl.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772096595/gray-collared-shirt-design-template_w6hi7k.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772096595/61xJm9OFDeL._AC_UY1000__m2uhn8.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772096595/yellow-collared-shirt-design-template_bhfou3.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772096563/711268-14605036_gqtlqn.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772096563/New-Polo_Flat_wrp7ci.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772096563/grey-polo-shirt-mockup-front-used-as-design-template-tee-shirt-blank-isolated-on-white_m5of8i.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772096564/white-polo-t-shirt-mockup-template-medium-re-design-4964ba095ea76fb3449a6b4937f73618_screen_vnegj3.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772096564/K90236s_ekqqmk.jpg"
];

const GRAPHIC_TSHIRT_IMAGES = [
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772098531/61xrPXnaTSL._AC_UY1000__a9g5o2.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772098531/161431509-dynamic1-pdp_rndkfv.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772098532/873730228-dynamic1-pdp_etpzyg.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772098550/mens_take_it_slow_vintage_inspired_triblend_kelly_with_cool_funny_turtle_graphic_on_model_1600x_duv5t2.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772098550/goods_09_479030_3x4_jxsnyo.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772098508/61ETIupdWLL._AC_UY1000__wxoo41.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772098509/71aJNnIUSBL._AC_UY1000__jlgrgr.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772098509/DP0629202313020933M_ihx0lf.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772098509/71QMsrys-lL._AC_UY1000__biambw.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772098463/LILBHABYYY_ezzkng.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772098488/il_570xN.2024844281_jcs4_yiqklf.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772098488/goods_27_461415_3x4_rz7gra.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772098493/ClevelandArtworkTshirtBack_miwfif.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772098462/DP0522202411095759M_ftknur.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772098463/AY1753s_haciyc.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772098462/unisex-staple-t-shirt-black-front-6539555f90a93_uxb5q7.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772098463/0097603260303NEW_00_052_rrewhl.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772098433/RMS2423PG337_ay0mfg.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772098433/Tee-NL3600-White-GraphicDesignIsMyPassion_vtoa19.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772098433/kobeblack_ixzjsr.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772098440/Y2K-Locked-In-Graphic-T-Shirt_oflhch.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772098401/carhartt-relaxed-fit-lightweight-pocket-dog-graphic-t-shirt-men-beach-brown-106778-A33-BEACH-3_ctaybl.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772098401/ai_creative_0000_Layer_6_t6r8jr.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772098401/M_J_AIR_JDN_WM_85_AOP_SS_CR_f2ptvl.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772098402/berry-fresh-sweet-graphic-tshirt-t-shirt-mure-grand-290973_eqmcnh.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772098402/NIR130080_600x_oylpnx.png",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772098379/mens_reflections_vintage_inspired_triblend_gold_tee_shirt_with_cool_colorful_lake_graphic_1600x_eiw5sw.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772098379/0097522800388NEW_00_010_v5xj3d.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772098383/mens_reflections_graphic_v_neck_tee_cool_artistic_nature_t_shirt_solid_threads_5000x_cjx2h5.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772098384/654178059791ea32b474167b-into-the-am-premium-graphic-tees-men_zxjjh5.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772098400/0120522800643NEW_00_010_pazkf7.jpg"
];

const SNEAKER_IMAGES = [
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774285040/uomo-basse-sneakers-scarpe-bianco_jvtays.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774285040/1_7e937f13-bb80-49cb-a6f1-301c87ccf63a_acjybx.png",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774285040/112402.Best-Of-All-White-Sneakers__copy_2_600x.progressive_aye8yh.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774285041/Jansen_retro_sneaker_textile-Sneakers-WO1017-048_Grey-2_1080x_yst6ue.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774285046/white-sneakers_2_vijcen.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774285030/gettyimages-2209615002_dntiuy.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774285039/Suede-Classic-Sneakers_beweap.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774285039/Y03796_P7476_T8013_F_hrrgsn.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774284890/ff8c627fe9b5511d49db50c11273d5996c6ef23d7a9c4377cd2ce3800f0920e9_svu4yl.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774284981/Mens-Motion-Access-Mid-Waterproof-Sneaker-TBL-HERO_xc8nfn.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774285001/10455_WBWB_101_kfzlre.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774285006/Platinum_Stairs_2_h6adfy.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774285027/BeauToday-Chunky-Sole-Lace-Up-Sneakers-for-Women-BEAU-TODAY-231_1080x_hzk0na.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774284889/4e939778-9be4-4ca7-bbef-fd922b25579f1717216485904ASIANMenSneakers1_pqeo7i.webp",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774284889/4410029-2307_1_juamgm.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774284890/side_wirnet.png",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774284890/OG-30_22G-1249_BLU.BELL_WHT_7_xsdiip.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774284887/757892_AACAG_9055_001_100_0000_Light_dgtpom.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774284887/PUMA-Club-II-Era-Sneakers-Unisex_jm5ub1.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774284888/954_b5347d8644-1887-9-full_fgk8ae.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774284888/0000s_0016_DSC07362.ARW_twtv7i.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774284887/Untitled_design_8_a5jakw.png",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774284884/MG_9335_jgs12u.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774284885/aa500205-ba8a-4b5b-83b3-6fbeef678ddc.480f707bdd92c6873286f95a0e4d324a_oxblfo.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774284885/cloud-white-brown-standard.1600_fise9t.png",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774284886/28954-1009-AW24_0101-4_fyuqcj.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774284883/Grand_Court_Shoes_White_GW9214_HM1_s7jmsj.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774284883/index-68cc54bc00b60.jpg_govhpa.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774284883/28954-1009-AW24_0111-5_gmaquy.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774284884/2505-GQR-Inlines-WhiteSneakers-Salomon-0560_gxvuml.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774284881/Womens_Cardinal_Sneaker_Latte-WCCSC23NSP_LAT_Side_gbzckw.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774284882/WF-4001-WHT_Pair_Front_cxkmjt.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774284882/sneaker-uomo-blu-avellino-ciccone-1_tjsgyk.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774284882/bouncing-sneaker--242250Z_2002-front-wm-1-0-0-800-800_g_poayu9.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774284883/0000s_0016_DSC07362.ARW_fb98wg.jpg"
];

const SPORTS_BRA_IMAGES = [
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774201131/American-Tall-Women-Balance-Crisscross-Sport-Bra-Black-Off-Fig_gfbkvq.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774201131/Mauve_06faa0da-4d96-42cf-846d-81f64266c35b_r7fvfk.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774201131/cdnb2c.panache-lingerie.com_u5nee7.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774201132/W_sSend-itSportsBra26004-BLK_sxqkyn.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774201130/fd7499423779ffec63bfde30ab4e71e482a6fb9a_pw1n9b.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774201129/Ribbed_Sports_Bra_For_Women_-_Blue_Coral_dynimf.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774201129/01_013_020_Look_400x_re4k0g.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774201131/07.02.20251833_umqcbm.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774201130/EverydaySeamlessSportsBraGSBlackB8A4T-BB2J0631_9922bc0a-205a-4aaa-bd38-ef817c9c23e0_tfrjvc.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774201130/99eb4b8d0b956924df5c7b790f503d6d2c9a32f8_j0muxt.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774201056/250204_RESHOOT_EVERYDAY_SPORTS_BRA_MIDNIGHT_PDP_1440x1800_01_400x_vctxyq.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774201055/12868_47c1283b3d-13505-001-1-1350x0_yac5zq.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774201056/pbra01-016-gymnastics-black-keyhole-racerback-sports-bra-action_oi6qwy.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774201064/BT0693-Black_Purpose_4_6309c997-8679-4ccd-9362-429338cb13c0_hkuzpv.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774201128/240807_AW24_EVERYDAY_SPORTS_BRA_BLACKBERRYPURPLE_PDP_1440x1800_01_um24ui.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774200983/61CWo85suHL._AC_SL1500__ouewgj.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774200990/w2000_q60_sjranv.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774201055/241204_NOOS_EVERYDAY_SPORTS_BRA_BLACK_PDP_1440x1800_01_600x600_psg3hl.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774201054/soccer-gps-vest-celebration-moment-luson-sport_rwpbpc.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774201055/activewear-black-sports-bra-shorts_fwcyky.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774200974/AYBL_02_02_240004_3f68849a-7a79-4944-8d26-bf1402f0a41a_duas18.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774200973/19980C001_main_ys6zsb.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774200972/3692_1354_073_of_mtxs55.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774200972/rr1837rb_on_the_go_sb-e_1_1_1_4_uaupne.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774200973/71I11irVK2L._AC_SL1000___uj6vek.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774200895/SHF_Photography_PDP_Ultimate_Black_1200x1600_22_dzoqdx.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774200896/pro-sports-bra-white-nordicdots-W-SB2-WT-women-tennis-padel-golf-pickleball-nordicdots.com-1_dc610bf8-1673-4764-9ce6-3c59c4ad0429_ej8bui.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774200896/HNS_O9003_EbonyHeather_Front_gnti1n.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774200972/aabc2073_ac9b_4014_8ee8_77daf812b213_zpg1jt.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774200973/LW2EHHS_0001_1_o4xnuu.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774200892/20250127_LightWork_MateTheLabel_ApparelFlats_SetA_OrganicStretchSportsBra_PBL_0039_e70ff100-6ac0-44c4-99ce-32377ca23d10_jdls1n.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774200894/vwt-sports-bra-test-shefit-low-impact-private-004-29941f3a6c3b4081894fc8fa345e4698_vokd6p.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774200894/maxresdefault_jzoymz.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774200895/the-best-nike-sports-bras-for-running_apuyiw.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774200785/HNS_O9178_Black_Front_bv0phz.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774200784/American-Tall-Women-Balance-Crisscross-Sport-Bra-Black-Off-Fig_kuefzm.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774200797/T98988s9_xj4ggn.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774200893/lift-20-seamless-sports-bra-black-clothing-ryderwear-425486_1080x_xplvsk.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774200894/BT1498-White_JetSet_2_sosqah.jpg"
];

const YOGA_PANTS_IMAGES = [
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773932607/W5766R_01_b1_s1_a1_1_m224_930x_k7mdrj.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773932608/8056-yunoga-25_-no-front-seam-soft-yoga-pants-royal-blue-6_h1ruva.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773932608/leggings-2048px-0051_sle6iq.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773932608/0708_5230_073_of_qhd8dg.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773932608/B17238s3_lbut0t.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773932529/Womens-Cotton-Spandex-Yoga-Pant-Royal-Apparel-1669668776_1200x_u8haqf.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773932530/SD3243_lilac-petal-heather_3502_gcjccq.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773932530/izzy-women-egypt-57-500x625_g0zmqc.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773932530/H1_0037_Background_akwvfu.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773932422/tula-harem-yoga-pant-slate-164809_nkfolq.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773932435/D65092s_tpxcbm.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773932529/W5766R_01_b1_s1_ai_1_m224_750x_nrusgj.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773932528/6324ff58f876471b409aa0dfe330db9c_l_ycgcgu.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773932529/d94bed4fc0f55ea67846c475568add51e0-alo--.2x.rvertical.w536_nenij5.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773932420/8300GD-BLACKS_ma8y8p.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773932420/61aUZQs50XL._AC_UL375_SR375_375__rmdhl9.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773932420/izzy-women-egypt-57_uffiie.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773932422/847ce79f-1604-4f70-b07d-af4471075ec0.37853427d03f63811485637e69048a6c_whbzrd.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773932422/61bRc2NMmHL._AC_UY1000__rmmbib.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773932335/hm250108-digital-ecomm-yogapants-athleta-3520-68c08a0921d5d.jpg_wtqvhi.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773932339/2_bdcd0eef-8ee9-4b05-8e22-6e03a65be83b_nx3x5c.png",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773932336/5_ab50cc90-039f-45e9-b217-ee447bb7957c_pldxc6.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773932339/YogaPants_016_qu1wea.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773932338/fd7cea340dab6e0353441928ae6d6ff617a0cb3a9e99d9bf12c367d64638072c_8963df02-d50d-4d45-ae41-3c20ad4ef776_m4xych.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773932337/2BA1120_1_ix3n0w.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773932335/61KWDwU4cNL._AC_UY1000__ych0df.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773932335/51Tn3vpGYTL._AC_UY1000__uqzjq6.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773932335/7_272894d6-c8dc-4a10-83be-23acf3330679_a4yxdi.jpg"
];

const WINTER_JACKET_IMAGES = [
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772101523/65680b6361bfca1302070f83-men-sherpa-lined-jacket-men-39-s_uxjn28.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772101523/VPO_Fjallraven_Expedition_Mid_Winter_Jacket__Mens_navy__un_blue_5_y3qxgx.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772101523/moncler-maya-hooded-short-down-jacket-men-black-moncler-0_ji1xin.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772101523/658bf5ae7c3860705c5bf4fc-lezmore-cuff-heavy-lapel-jacket-winter_kenxtc.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772101568/8dfadbf752786cd5fd445bcaa4623eb7_rbsors.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772101469/545387a_nmoxvq.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772101469/REI_20Co-op_20650_20Down_20Jacket_20_28view_20from_20front_20-_20m_29_0_mvqc3d.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772101490/downjackets-2048px-9083-3x2-1_tl6kjh.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772101491/523050_1_41_x2x13g.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772101522/greenland_winter_jacket_m_87122-550_c_model_fjr_dm3jxc.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772101391/montana-jacket-men-beige-3_uikbdw.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772101395/RB1176B0001_iixzjn.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772101436/Delta-ComPac-Winter-Jacket-browngrey-hero-0475-LR_mv8ox4.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772101468/41774_698-1-onbody1_hy1pmd.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772101421/711WEMJ8h6L_esgtvf.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772101436/LEEy-world-Winter-Coats-For-Men-Men-s-Hoodie-Jacket-6-Zip-Pockets-Warm-Winter-Jacket-Tactical-Jacket-Black-XL_132341ac-9114-40e2-a20e-9926005266b3.e6dc3e2b47ad7221111014b5a8f5fa5b_yootkv.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772101443/downjackets-2048px-9083-3x2-1_yu5ym1.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772101414/Ajaton_1080x1080_lkdp1b.webp",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772101414/Mission-Workshop-Westward-Advanced-Pea-Coat-feature_ba3d6i.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772101415/6939840de4cb16f9280a44bf-yozai-men-s-winter-coat-warm-jackets_vhjvpc.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772101323/erjjk03547_roxy_l_crc0_frt1_rizwlz.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772101325/square_fw24_fjallraven_33132_gjrl1j.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772101361/s-l1200_t4nmip.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772101389/The_20North_20Face_20Gotham_20III_20_28m_29_cmprud.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772101390/Mountain_20Hardwear_20Stretchdown_20Parka_pnavlt.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772101303/HR-FW24-EDITORIAL-HowLongShouldYourWinterCoatBe-ArticleAssets-standalone-medium-3691x2953_n2hihl.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772101303/7f8d7937-91a2-4053-943f-d3df2bb2ffd2.__CR0_0_300_400_PT0_SX300_V1____y7rdww.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772101321/41b1oVj7E3L_mdiljv.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772101323/81E5sFpv8EL._AC_UY1000__qpke14.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772101275/downjackets-2048px-9071-2x1-1_ni3bx3.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772101280/woodpecker-mens-long-winter-coat-penguin-blue-diamond-5_rp0sgl.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772101302/s-l1200_jxzyhf.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772101302/AW25_Jacket_Infographic_with_Kupponen_bmjbhg.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772101275/81bZglvaBXL._AC_UY1000__ma8jgb.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772101274/61iBJGpSSVL._AC_UY1000__yosfxb.jpg"
];

const SHORTS_IMAGES = [
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772097155/Indie-Training-Short-Black-Front-2_y0k0gc.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772097156/71016ePWLfL._AC_UY1000__qnbvus.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772097156/G_NK_DF_ONE_5IN_BIKE_SHORT_jlp6iw.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772097156/FAKKDUK-Athletic-Shorts-Womens-Casual-Yoga-Pants-Teen-Girls-High-Waisted-Shorts-Comfy-Lounge-Workout-Sports-Shorts-Summer-Baggy-Shorts-Pockets-Black_40da3202-4f8f-4127-9ce0-0c4a39d86098.85df6caf7dd8a36a86b9b5198fdca7a1_mwqlof.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772097157/61sKmxNDBOL._AC_UY1000__prsm1q.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772097008/71e6OF7k8WL._AC_UY1000__wthyis.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772097006/erjfb03441_roxy_l_kvj0_frt1_s3ahej.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772097007/719363s3_ji5vbg.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772097007/What_Length_Shorts_Should_I_Buy_lap3mz.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772097007/Sport7ShortsGsBlack-GsBlackA1B3L-BB2J-1015-Edit_fff8fb45-65e0-4e83-a465-131f730fb80a_3840x_ltcw59.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772096910/61sKmxNDBOL._AC_UY1000__lknf4w.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772096972/images-Arrival5ShortsBlackA2A1M_BBBB_1826_A_Edit_3840x_sf4qh3.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772096973/5200ccc262d65fd3531932b36a91bef681d4fee8_ybhcyu.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772096974/mens-athletic-workout-shorts-334514_vsmh42.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772096974/M_NK_DF_FORM_5IN_UL_SHORT_tniahh.png",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772096903/163253s_so4bdh.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772096903/W_J_SPT_DF_PRCT_HR_6IN_SHRT_cako6c.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772096905/images-A1B3M_GB7X_1_229b84d9-5424-45f8-befb-52fd95589e4c_3840x_p98egy.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772096905/Indie-Training-Short-Black-Front-2_nvmm9u.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772096906/G_NK_DF_ONE_5IN_BIKE_SHORT_lgsovo.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772096902/What_Length_Shorts_Should_I_Buy_p6x9sj.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772096902/Sport7ShortsGsBlack-GsBlackA1B3L-BB2J-1015-Edit_fff8fb45-65e0-4e83-a465-131f730fb80a_3840x_syalre.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772096903/719363s3_kbqvr5.jpg"
];

const GYM_TANK_IMAGES = [
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773766820/5100OSJ621L._AC_UY1000__kvkzsh.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773766821/jed_north-image-1589387845666_1_wjuggv.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773766821/61QfDZ1pCRS._AC_UY1000__zjauiw.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773766827/mhl-wrkout-lululemon-6899f738a1c84_twb59u.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773766832/LegacyDropArmTankGSStoneGreyA5A2Z-GB7S-1606-0171_818e2dd5-068d-457e-aaad-100e37ac42a2_rxohh3.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773766771/1214_grande_x8j0ue.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773766796/81UqS3qebYL._AC_UY1000__smsuqx.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773766797/51bUj-jz1bL._AC_UY1000__p3au4n.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773766803/s-l400_ic0mvf.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773766815/Mens-Tank-Top-Beach-Men-Casual-Solid-Tight-Fitting-Sports-Stripe-Gym-Tank-Tops-Vest_a9a2bd48-432d-4f30-bd44-24e72e22662e.e2fc724dab946b5bcace9397b20f5e53_t4lkq9.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773766759/61jiQWznpqS._AC_UY1000__orn1hp.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773766759/basic-stringer-tank-top-tuffwraps-30344532557912_bcnhob.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773766759/Gold_s_Gym_Classic_Joe_Stringer_Yellow_Gold_Color_b5y3or.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773766760/whm240109-digital-ecomm-workout-tank-top-lead-66e9e3443df3e.png_t6lidy.png",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773766760/029e8452-eb28-4c4c-979a-a930bff34eee.573360bdd5b0962a18a07aba5b984110_m7ebdd.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773766714/womens_golds_gym_tank_top_ug1ssf.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773766714/gray_1_g6bn6t.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773766728/mens-stringer-gym-tank-top-98f6eb_fyv8jv.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773766714/mens_stringer_tank_top_gym_shirt_golds_gym_black_y30rpl.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773766759/mens_stringer_tank_top_gym_shirt_yellow_golds_gym_2048x2048_m6fru7.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773766689/GOLDS-GYM-60TH-ANNIVERSARY-COLLECTION-70S-DECADE-BODYBUILDING-YELLOW-STRINGER_ft9dct.png",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773766713/MensVintageGymShorts-18_h3ge0a.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773766713/images-GFXLifting1RDETankGSBlackA2C1R_BB2J_1230_0009_gty8ee.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773766713/029e8452-eb28-4c4c-979a-a930bff34eee.573360bdd5b0962a18a07aba5b984110_qy0gpm.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773766714/51cW1T8o_3L._AC_UY1000__xzfeoj.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773766612/221205_GG_Classic_MEN_Stringer_Muscle_Joe_Gelb-1124_1142x1142_2x_gfzfgr.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773766619/golds-gym-classic-stringer-tank-top-army-marl-orange_2_tkw4mc.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773766679/classic-tanktop-dunkelgrau-3xl_jlqngy.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773766688/mhl-wrkout-lululemon-6899f738a1c84.jpg_kwnvvb.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773766611/1785455447_max_bhxwfa.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773766611/Custom-Blank-Low-Cut-Tank-Top-Cotton-Y-Back-Gym-Stringers-for-Men_yebn0v.webp",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773766611/DBZ3_grande_ebasgn.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773766612/arnie-t-back-emerald-clothing-ryderwear-478832_500x_opbqvg.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773766612/maxresdefault_isclno.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773766584/AQB19_saq8ey.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773766585/LANCE_0041-Gym-Tank_MGrey_u4k2dz.png",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773766585/performance-tank-black-main-min_l13b15.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773766585/gym-tank-rib-white-167215_ijeuah.png",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773766586/1734_gr_yhueba.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773766551/amazon-large-2-4_kafhfp.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773766552/tank-top-don-t-look-back-men_cfhmlx.png",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773766552/IMPACT-ORANGE-Gym-Tank-Top-Men-Workout-CrossFit-DC2-Bang-Clothing-Miami-1_vw4mtg.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773766553/1_e1a5c7da-aa9c-4be0-9d99-92af3af59d84_jhdhtw.png",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773766562/s-l1200_apleao.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773766525/1734_kl_gyps8s.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773766550/Design-Your-Own-Cotton-Plain-Bodybuilding-Custom-Fitness-Stringer-Gym-Tank-Top-for-Men_vla4ji.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773766551/Gym-Wear-Loose-Drop-Arm-Vest-Custom-Men-Tank-Top_ymo1mb.webp",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773766529/Plain-Blank-Deep-Cut-Gym-Tank-Top_id5hmv.webp",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773766511/images-RibbedTank1PKWhiteA5A8H_WB57_1076_3840x_dwqo29.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773766519/black_yoscvh.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773766521/golds-gym-classic-stringer-tank-top-turq-yellow_mq29qc.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773766520/s-l400_xnp9wc.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773766493/1800-viscose-oversized-cutoff-gym-workout-stringer-tank-for-men-black_4_vm6bef.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773766494/Plain-Blank-Deep-Cut-Gym-Tank-Top_faetna.webp",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773766494/312_20brown_20chase_enkpa6.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773766503/baller-tank-white-clothing-ryderwear-493188_500x_vogg9h.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773766463/gators_gear-9_1024x1024_2x_ojo7bq.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773766466/1708000486-14680308-9345101754643675.jpg_tivtg5.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773766466/mens-stringer-gym-tank-top-8-9ed1_vnr2pc.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773766472/11_26_24_Golds_eComm2119_qwcjbp.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773766493/DBZ_grande_nqeaph.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773766443/mens-just-gym-tank-top-709587_yeakdg.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773766461/adviicd-Men-Tops-Long-Sleeve-Mens-Tank-Top-Men-s-Muscular-Cut-Open-Sides-Bodybuilding-Tank-Top-Gym-Workout-Stringer-T-Shirt-Black-3XL_ad711061-0f45-43ee-9d29-ec81af778417.78323cce5dc07bc00947f7e7406bbde4_mbxwdo.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773766462/CriticalDropArmTankGSBlackA1A2R-BB2J-0638_symqc4.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773766462/OKBOP-Ribbed-Tank-Top-Men-Men-Casual-Solid-Tight-Fitting-Sports-Stripe-Gym-Tank-Tops-Vest-White-L-US-6_479f1834-ca72-4596-8658-71b9fd5deee7.5f53a23d1f33eb2505f025ea795141ec_j18muk.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773766462/images-A1A2P_BB2J_1_bhnyz9.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773766436/Herrnalise-Men-s-Muscle-Gym-Workout-Men-Casual-Solid-Tight-Fitting-Sports-Stripe-Gym-Tank-Tops-Vest_6382ec25-2aa0-456f-bdce-7bc7802dae30.c513455000d301fff4f227528540b858_t2ttni.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773766436/TOPS_ACTIVE_TOPS_fmh4xr.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773766437/womens-performance-tank-black-front_yem8ov.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773766437/OLYMPIC-BLUE-Gym-Tank-Top-Men-Workout-CrossFit-Bang-Clothing-Miami-2_arfbyk.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773766437/LA-BEACH-EN-ROSE-Gym-Tank-Top-Men-Workout-CrossFit-Bang-Clothing-Miami-4copy_ozou8b.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773766411/jed_north-image-1589387845666_1_ula7mn.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773766411/61QfDZ1pCRS._AC_UY1000__fiyz6d.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773766410/5100OSJ621L._AC_UY1000__ymulyv.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773766411/mhl-wrkout-lululemon-6899f738a1c84_kq8ey3.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773766412/LegacyDropArmTankGSStoneGreyA5A2Z-GB7S-1606-0171_818e2dd5-068d-457e-aaad-100e37ac42a2_kgamqm.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773766323/s-l1200_occy4b.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773766326/51bUj-jz1bL._AC_UY1000__sfuxog.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773766395/s-l400_qkg5n5.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773766285/womens_golds_gym_tank_top_hmwvhl.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773766285/gray_1_rqatjc.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773766322/whm240109-digital-ecomm-workout-tank-top-lead-66e9e3443df3e.png_fbtphr.png",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773766291/61jiQWznpqS._AC_UY1000__fnl1u4.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773766323/029e8452-eb28-4c4c-979a-a930bff34eee.573360bdd5b0962a18a07aba5b984110_ndu6dr.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773766284/029e8452-eb28-4c4c-979a-a930bff34eee.573360bdd5b0962a18a07aba5b984110_y77cwz.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773766284/mens_stringer_tank_top_gym_shirt_golds_gym_black_yjutvn.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773766284/images-GFXLifting1RDETankGSBlackA2C1R_BB2J_1230_0009_z6dfm0.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773766284/MensVintageGymShorts-18_ypsmgz.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773766285/51cW1T8o_3L._AC_UY1000__iuvzvr.jpg"
];

const JOGGERS_IMAGES = [
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773824971/Mens-Reaxion-20-Joggers-TNF-MODEL34_m6pcu3.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773824978/images-CrestJoggersBlackA2A4H_BBBB_1833_A_Edit_qivrty.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773824978/Bonkerscorner_Midnight_Miles_Loose_Fit_Joggers_men4_r4ez65.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773824978/M_NK_DF_UV_PRIMARY_JOGGER_PANT_au52dl.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773824978/EssentialOversizedJoggersBlackA2A7T-BBBB-0277-Edit_426d5cf9-16da-43c4-b696-a4049a446850_idsbct.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773824794/images_wm7joc.webp",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773824795/-473Wx593H-467290457-grey-MODEL_aipcz5.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773824970/M_NSW_CLUB_JGGR_BB_b0nq9f.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773824970/EssentialOversizedJoggersBlackA2A7T-BBBB-0266-Edit_b995243f-2726-422e-ac83-fffee1c9749f_j668j6.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773824970/TrainingFleeceTallJoggerGSBlackB2C6D-BB2J989-0061_ntsxya.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773824506/American-Tall-Men-Fleece-Jogger-CharcoalMix-front_opklkr.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773824793/502.182995_C5493_00_HR_nz4roz.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773824793/2994-BK_579c2e80-5421-4d90-8695-d7f491cf98b7_tjxrde.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773824793/images-TrainingFleeceJoggerGSBlackB7A4D_BB2J_0126_0024_guabyg.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773824794/SportJoggersGSBlackA1B3K-BB2J-1824_A-Edit_cgbx0q.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773824247/Bonkerscorner_Midnight_Miles_Loose_Fit_Joggers_men4_wfskon.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773824247/images-CrestJoggersBlackA2A4H_BBBB_1833_A_Edit_oytfjy.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773824248/EssentialOversizedJoggersBlackA2A7T-BBBB-0277-Edit_426d5cf9-16da-43c4-b696-a4049a446850_biypt3.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773824250/30.09.20243001_xqg7o3.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773824253/EssentialOversizedJoggersBlackA2A7T-BBBB-1813_A-Edit_c6bf255b-24b3-4ce1-ab83-7957acc28b9d_fey7s0.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773822178/images_avnmna.webp",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773824247/Mens-Reaxion-20-Joggers-TNF-MODEL34_lcrkg7.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773824247/Mens-Wander-Joggers-20-TNF-MODEL34_htvjdv.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773824247/EssentialOversizedJoggersBlackA2A7T-BBBB-0266-Edit_b995243f-2726-422e-ac83-fffee1c9749f_t7mryz.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773824247/M_NK_DF_UV_PRIMARY_JOGGER_PANT_xfbq0t.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773822169/30.09.20243001_ttlexz.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773822169/American-Tall-Men-Fleece-Jogger-CharcoalMix-front_olletr.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773822173/2994-BK_579c2e80-5421-4d90-8695-d7f491cf98b7_pp4mno.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773822175/502.182995_C5493_00_HR_zax5dc.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773822175/-473Wx593H-467290457-grey-MODEL_lirv5x.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773822117/M_NK_DF_UV_PRIMARY_JOGGER_PANT_xef3fp.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773822117/Bonkerscorner_Midnight_Miles_Loose_Fit_Joggers_men4_et44h4.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773822168/EssentialOversizedJoggersBlackA2A7T-BBBB-0277-Edit_426d5cf9-16da-43c4-b696-a4049a446850_cfeinm.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773822168/EssentialOversizedJoggersBlackA2A7T-BBBB-1813_A-Edit_c6bf255b-24b3-4ce1-ab83-7957acc28b9d_gs9iyr.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773822168/images-CrestJoggersBlackA2A4H_BBBB_1833_A_Edit_onssxf.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773821933/M_NSW_CLUB_JGGR_BB_rm5vro.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773822110/2016_black_002_01_15_rudy_ecomm_ztsmpm.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773822110/Mens-Wander-Joggers-20-TNF-MODEL34_zehcwg.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773822110/EssentialOversizedJoggersBlackA2A7T-BBBB-0266-Edit_b995243f-2726-422e-ac83-fffee1c9749f_lm7upz.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773822116/Mens-Reaxion-20-Joggers-TNF-MODEL34_wieku9.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773821899/2994-BK_579c2e80-5421-4d90-8695-d7f491cf98b7_mg96je.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773821901/-473Wx593H-467290457-grey-MODEL_vlyg5i.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773821901/SportJoggersGSBlackA1B3K-BB2J-1824_A-Edit_opm84c.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773821902/images_wtzzgh.webp",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773821902/TrainingFleeceTallJoggerGSBlackB2C6D-BB2J989-0061_whyhbj.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773821898/30.09.20243001_she9ug.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773821898/American-Tall-Men-Fleece-Jogger-CharcoalMix-front_bzzkds.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773821899/502.182995_C5493_00_HR_g2vclm.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773821899/images-TrainingFleeceJoggerGSBlackB7A4D_BB2J_0126_0024_dslbls.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773821667/3236c9a4-96e9-469f-abc0-29a9c6302f5a_ofy7ra.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773821667/FLEECE_JOGGER_pepper-sq2__67224.1732205390_yxwd4i.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773821668/TRAININGWOVENJOGGERSBlackB1A1D-BBBB-1630_ulqm9q.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773821668/HNS_745V_LightSteel_Front_ubfwjv.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773821897/EssentialOversizedJoggersBlackA2A7T-BBBB-1813_A-Edit_c6bf255b-24b3-4ce1-ab83-7957acc28b9d_adfjly.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773821666/GUEST_0d3b58dd-0a5c-4528-8914-89e3f5a160e3_uyz1el.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773821666/61kg1iWpoOL._AC_UY1000__o1kpjp.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773821666/lululemonJoggers_hero_yfbtny.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773821667/American-Tall-Women-Hybrid-Jogger-Black-side_dakfa3.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773821574/RS07-5-Cyn-NEW-1_hlr826.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773821575/03042025_ARNE_WOMENS_ECOM_ROSS_COOKE_BLACK_RELAXED_ZIP_THROUGH_HOODIIE_AND_FLARED_JOGGER_348_JPEG_a8c9f161-feca-4aec-b603-cb9d81698f79_gkqtu4.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773821582/61rMItvkYRL._AC_UY1000__zrbnim.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773821589/Scrubs_HW_Jogger_Pants_A_RS_BLACK_TOP1_Full-Body-Front-Tucked-In_1027_2021_circular_element_zas1ss.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773821666/Sweatpants_vs_Joggers-843979-144830_b4fd63a6-9f9f-4443-9898-3917c5e246b1-188576_2048x2048_khh0rj.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773821531/554c49e2-504d-4b4a-8c9c-6a1de19cadd7_imw4a6.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773821531/d783e7a1-493a-478b-9b2f-bb6ce9d48a6b_vdicoe.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773821531/American-Tall-Women-Wearever-French-Terry-Joggers-Black-front_pckepe.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773821539/03042025_ARNE_WOMENS_ECOM_ROSS_COOKE_GREY_RELAXED_FLARED_JOGGER_031_JPEG_cd162286-b05f-40d9-b185-335344636ac9_whqyjy.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773821573/Athletic-Works-Womens-Super-Soft-Jogger-Size-XS-XXXL_bdb0490a-c130-4c37-84af-ccb1131014f5.40375eb26ac4c1055c54e892315dd7d8_szhc0g.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773821470/BG_OF_04197_Black_568_FW21_ydlzr7.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773821470/507476_1704_44_qqavck.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773821478/71-WH8rthPL._AC_UY1000__rwsz6l.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773821530/711QygUwPZL._AC_UY1000__duyr7b.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773821531/61g1G020daL._AC_UY1000__ik7zlo.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773821468/TRAININGWOVENJOGGERSBlackB1A1D-BBBB-1630_wikel2.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773821469/61WVlMFtmGL._AC_UY1000__qmuixq.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773821469/American-Tall-Women-Hybrid-Jogger-Black-front_y9szsj.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773821469/617yEeufCNL._AC_UY1000__uqexre.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773821470/W_NK_ONE_TF_JOGGER_PANT_uwpcqj.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773821386/3236c9a4-96e9-469f-abc0-29a9c6302f5a_mfrzh9.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773821385/lululemonJoggers_hero_tttwam.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773821388/FLEECE_JOGGER_pepper-sq2__67224.1732205390_skdag0.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773821468/HNS_745V_LightSteel_Front_gnhrtd.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773821313/American-Tall-Women-WEAREVER-SLIM-HIGH-WAISTED-SWEATPANTS-Grey-Mix-Front_tudxry.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773821329/Scrubs_HW_Jogger_Pants_A_RS_BLACK_TOP1_Full-Body-Front-Tucked-In_1027_2021_circular_element_bwr10v.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773821385/61kg1iWpoOL._AC_UY1000__dlnmbc.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773821385/GUEST_0d3b58dd-0a5c-4528-8914-89e3f5a160e3_qy1fss.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773821385/American-Tall-Women-Hybrid-Jogger-Black-side_p4dxbq.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773821312/03042025_ARNE_WOMENS_ECOM_ROSS_COOKE_GREY_RELAXED_FLARED_JOGGER_031_JPEG_cd162286-b05f-40d9-b185-335344636ac9_v4dxff.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773821312/Athletic-Works-Womens-Super-Soft-Jogger-Size-XS-XXXL_bdb0490a-c130-4c37-84af-ccb1131014f5.40375eb26ac4c1055c54e892315dd7d8_wsgex4.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773821313/RS07-5-Cyn-NEW-1_sx8rjs.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773821313/03042025_ARNE_WOMENS_ECOM_ROSS_COOKE_BLACK_RELAXED_ZIP_THROUGH_HOODIIE_AND_FLARED_JOGGER_348_JPEG_a8c9f161-feca-4aec-b603-cb9d81698f79_wnckap.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773820907/711QygUwPZL._AC_UY1000__kvjb1o.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773820907/American-Tall-Women-Wearever-French-Terry-Joggers-Black-front_epaxwc.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773820996/61g1G020daL._AC_UY1000__l1utj6.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773821312/554c49e2-504d-4b4a-8c9c-6a1de19cadd7_ivgjtj.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773821312/d783e7a1-493a-478b-9b2f-bb6ce9d48a6b_xqvrxz.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773820905/617yEeufCNL._AC_UY1000__ejon3g.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773820905/American-Tall-Women-Hybrid-Jogger-Black-front_gtj5ml.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773820905/BG_OF_04197_Black_568_FW21_f3rd51.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773820906/W_NK_ONE_TF_JOGGER_PANT_za1ps7.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773820906/71-WH8rthPL._AC_UY1000__njg8in.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773820905/61WVlMFtmGL._AC_UY1000__bnl9nz.jpg"
];

const BACKPACK_IMAGES = [
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773508817/LU9CLES_031382_3_cwkpfh.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773508817/travel-laptop-backpack-mygoo-haven-MH48A-89-CBK-side_qqfcpg.png",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773508818/TNF-FW25-BackToCampus-backpack-ingrid-carousel-5_n34e6b.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773508819/11544-00007-OS_01_v29psm.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773508816/TB205-Olive-2_qj7om2.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773508816/travel-backpack-black-30-2_a2e7f7f7-8159-47b8-a216-730bcf386960_abbcgp.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773508817/Travel-Backpack-30L-Ocean-1270_qmzn9h.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773508819/stadium-4-backpack_gftkv8.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773508843/Ecom-Model-Ivy-Black-1_dcf56ab8-16b0-47b5-a061-589f8a4630cf_d71u1x.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773508815/PDP_Featherlight_Backpack_Large_Olive_02_dicttx.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773508815/The-Transit-Backpack-Pro_HG-1_nplrlx.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773508816/Antler-01-Discovery-Backpack-Black-Angle_dxrlwi.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773508813/1024x1024-Men-Backpack-Toscanello-082324-3.4Straps_1024x1024_szhqji.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773508812/STB1957_KaneKidsTravel_Navy_Neon_TT_FRONT_1_yr5a1d.png",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773508814/61sufLjWbHL._AC_UY1000__nvt2ay.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773508814/Travel-Backpack-30L-Eclipse-1287_t5aued.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773508812/MetrosafeX_25LBackpack_30645100_Black_1_lz0i14.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773508812/71E4O25QXKL._AC_UY1000__ai3gb7.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1773508812/4dc82491-e6a1-41b7-91db-84485d7231e1.db56d94109d8e1633ad3b47163a0d01d_npaung.jpg"
];

const WOOL_SWEATER_IMAGES = [
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772101090/sweaters_xxeijh.png",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772101089/CAK0129-035094M_b358fab2-bd27-4321-a7fe-4f040e65bf78_yeid1w.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772101090/w36iub170j7a1_msrgfn.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772101090/Wizard_100__Wool_Fairisle_V-Neck_Sweater_Vest_zyfw0w.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772101133/IMG_6906-768x1024_wfbsuq.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772101069/il_570xN.3524091241_mpea_yoywkx.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772101073/4911-GREEN-MODEL-MENS-BRITISH-WOOL-JARVIS-ARAN-JUMPER-2_538418ba-6621-4fda-b1c4-1b7fb29ca33e_iir94c.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772101078/anatoly-sons-sweater-blue-lupetto-cable-knit-sweater-32810689724495_q6hpxe.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772101089/Womens-Wool-Sweater-A191-162_iekxai.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772101049/2e3b6c4bc56d06767af42853fa0c8bf3fdd3cbdb_xxl-1_sdjd72.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772101052/1755175641-asket_hws-ma-clm_thumbnail_kuvvuw.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772101053/SGE04589_clipped_rev_1_bppcji.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772101057/Journal_-_Washing_merino_sweater_4_go7poo.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772101065/Gray-Wool-Sweater_wp4qhl.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772101026/DSCF2932_aium1z.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772101026/65fd88d51b14b94fcc15c7ce-aran-woollen-mills-womens-aran-knit_ndkbms.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772101026/285174_33018_41_ybpzvq.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772101026/B951_-_Sunflower_Yellow_1__22413.1744297261.560.850_kt7jjb.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772101034/518403_292_44_kcuatb.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772100991/ARAN-WOOLLEN-MILLS-Women-s-Aran-Knit-Sweater-Merino-Wool-Cowl-Neck-Ca_50902283-ea03-4da1-a757-3a59b3ef7caf.efa9cbb3a4ea2b30ce05462e613c43f7_vufne7.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772101010/A222_Parsnip__49889.1749547816_q9peqr.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772101016/Brownish_Hiutaleneule_Snowflake_Wool_sweater_knitting_kit_uygcpu.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772101021/1755175638-asket_hws-ma-clm_slideshow_2_v524gh.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772101025/517593_44596_44_pyb1t5.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772100970/icelandic_jumper_sweater_man_near_sea_bf52edca09_yp0i2z.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772100990/285174_0_44_bduka8.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772100990/LUCIEMARIONMOHAIRAMBERAW248_qaxmhh.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772100991/STEPHANIEMERINOCHOCOLATEAW249-min_nxvgho.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772100991/517593_44596_41_s7klwj.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772100968/34-09_Garri_ifcrwv.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772100968/285174_33018_44_udwwbg.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772100968/knitted-wool-chunky-cabled-sweater-turtleneck-pullover-oversized-gray-dukyana-650x972_xcvzra.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772100969/Irish-Wool-Sweater-Gray_ett93v.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772100969/511548_179_48_dqjbsc.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772100950/Fishline_Oatmeal_Womens_aomthf.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772100951/r836-oatmeal-1-59896_yumsjx.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772100951/Coarvegiella_Green_Winter_Alafoss_Wool_Sweater_Knitting_kit_tcumgs.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772100951/298259_7030_41_ray5i1.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772100968/Irish-Wool-Sweater-Gray-A825-045_d8skmc.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772100894/285174_33018_46_sdw2ij.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772100895/Aran-wool-Sweater-Misty-Grey-2_gvvncg.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772100899/Aran-Wool-Sweater_hecnbm.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772100938/511548_179_44_gfzvsd.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772100950/Stardust_Scottish_Shetland_Wool_Sweater_h5wnx5.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772100894/C1347_Mlead__00972__76376.1518007484_fcdciu.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772100894/a823-wicker-3-73209_ic0h1r.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772100894/d100300af73c307a2ccea238f61ac3ede787c2c9ff2ebe6aac92222e66630483_sisqqd.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772100894/Blueprint_Scottish_Shetland_Wool_Sweater_jydfdo.jpg"
];

const BLAZER_IMAGES = [
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774203538/686f74cbbae39ffc3698fc6e_s7-1339457_alternate10_twqcdi.webp",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774203538/s7-AI715928571001_alternate10_jrcjmh.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774203541/OBL11-PWH_Ecomm_02_0176_bx4alt.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774203609/20241023_SWY_325__websize_ogksu8.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774203643/image_tskjuy.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774203536/19918-404_1_h6fj2n.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774203537/31083f2f_764e_jf3p2m.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774203537/Q99543s5_ncualz.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774203537/61aeS5su5PL._AC_UY1000__vw7eup.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774203538/A_010224f3-e54b-4401-bb2d-78885be19de0_ytjpf4.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774203534/61VFfcRcyOL._AC_UY1000__ubf0cc.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774203534/15023140_0_0_zxlpsc.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774203535/s7-1135845_alternate10_swb0jz.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774203536/TravelBlazer_clipped_rev_1_yjzq7t.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774203536/PerformanceBlazer-Blue-Front_srs4hv.png"
];

const CAP_IMAGES = [
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1774961041/IMG-20260329-WA0119_ws0icb.jpg"
];

const BOOT_IMAGES = [
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772101784/799665_10_uwhewx.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772101745/the-low-down-on-chelsea-boots-2_qjriex.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772101786/1080x1350_0003_WG81_Dodo_1316_Blackstone_AW25_gzdvkq.png",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772101786/0000s_0031_DSC06106.ARW_t7nb0z.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772101817/ChelseaBootGROUP_LR_rf5pwg.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772101694/MF-2002-BRO_Pair_Front_kbgv1o.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772101695/0000s_0033_DSC06108.ARW_x3lcih.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772101695/778745_06_r20_ud1oqo.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772101722/0000s_0043_DSC06118.ARW_ulmtuk.jpg"
];

const NEW_HOODIES: Product[] = HOODIE_IMAGES.map((img, idx) => ({
  id: `hoodie-${idx}`,
  name: `hoodie #${idx + 101}`,
  category: "hoodie",
  price: 35 + (idx % 10) - 4 + 0.99,
  oldPrice: 49.99 + (idx % 5),
  discount: 25,
  rating: 4.8,
  stock: 45,
  description: `The Core Essential Performance Hoodie is your go-to layer for every season. Engineered with a soft-touch cotton blend and a modern athletic cut, it provides exceptional warmth and versatility. From early morning runs to late-night lounge sessions, this hoodie delivers comfort that lasts.
  
  ### Key Features:
  - **Soft-Touch Fleece:** Incredible interior softness for maximum comfort.
  - **Athletic Cut:** Designed to move with you without feeling restrictive.
  - **Reinforced Kangaroo Pocket:** Durable storage for your essentials.
  - **Adjustable Scuba Hood:** Provides extra coverage and a modern look.
  - **Ribbed Cuffs & Hem:** Secure fit that retains its shape.
  
  **Material:** 80% Cotton, 20% Polyester
  **Quality:** Premium Athletic Grade
  **Shipping:** Express worldwide shipping. Tracking provided.`,
  image: img,
  images: [img],
  datePosted: new Date().toISOString(),
  fabric: "Premium Cotton Blend",
  quality: "Premium",
  sizes: ['S', 'M', 'L', 'XL', 'XXL', 'Normal'],
  colors: ['Black', 'Midnight Blue', 'Heather Grey', 'Forest Green', 'Normal Color'],
  shippingCountry: "Worldwide",
  sellerId: 'seller-1',
  sales: 240,
  badges: ['Best Seller', 'Trending Product'],
  tags: ['hoodie', 'sweatshirt', 'winter', 'clothing', 'athletic'],
  metaTitle: `Core Essential Performance Hoodie - Premium Athletic Sweatshirt | W-LORD MARKET`,
  metaDescription: `Shop the Core Essential Performance Hoodie. Soft fleece lining, athletic fit, and durable design. The ultimate versatile layer for fitness and casual wear.`,
  metaKeywords: `hoodie, performance hoodie, athletic sweatshirt, gym hoodie, fleece hoodie, men's sweatshirt`,
  imageAlt: `Core Essential Performance Hoodie Style ${idx + 1}`
}));

const NEW_TRACKSUITS: Product[] = TRACKSUIT_IMAGES.map((img, idx) => ({
  id: `tracksuit-${idx}`,
  name: `tracksuit #${idx + 201}`,
  category: "tracksuit",
  price: 45 + (idx % 8) * 1.5 - 3 + 0.95,
  oldPrice: 65.99 + (idx % 4),
  discount: 30,
  rating: 4.9,
  stock: 30,
  description: `Dominate your workout or travel in comfort with the Pro-Performance Athletic Tracksuit. Engineered with moisture-wicking technology to keep you dry and comfortable.
  
  ### Features:
  - Breathable, high-stretch fabric
  - Full-zip jacket with secure pockets
  - Tapered joggers with adjustable waistband
  - Reflective details for low-light visibility
  
  **Material:** 90% Polyester, 10% Spandex
  **Shipping:** Fast global delivery from our Sialkot manufacturing hub.`,
  image: img,
  images: [img],
  datePosted: new Date().toISOString(),
  fabric: "Performance Tech Blend",
  quality: "Export Quality",
  sizes: ['S', 'M', 'L', 'XL', 'XXL', 'Normal'],
  colors: ['Navy/White', 'Black/Red', 'Grey/Black', 'Royal Blue', 'Normal Color'],
  shippingCountry: "Worldwide",
  sellerId: 'seller-1',
  sales: 510,
  badges: ['Best Seller', 'Limited Stock'],
  tags: ['tracksuit', 'sports', 'athletic', 'set', 'gym'],
  metaTitle: `Pro-Performance Athletic Tracksuit - Teamwear & Training | W-LORD MARKET`,
  metaDescription: `High-performance tracksuits for athletes. Moisture-wicking fabric, durable design, and factory-direct pricing.`,
  metaKeywords: `tracksuit, athletic wear, training suit, sportswear, performance clothing`,
  imageAlt: `Pro-Performance Tracksuit Model ${idx + 1}`
}));

const NEW_POLOS: Product[] = POLO_IMAGES.map((img, idx) => ({
  id: `polo-${idx}`,
  name: `polo #${idx + 301}`,
  category: "tshirt",
  price: 30 + (idx % 12) - 5 + 0.99,
  oldPrice: 42.99 + (idx % 6),
  discount: 28,
  rating: 4.7,
  stock: 100,
  description: `Elevate your everyday style with the Elite Heritage Pique Polo Shirt. Combining classic sophistication with modern comfort, this polo is crafted from premium breathable pique cotton. Whether you're on the golf course or in a casual business meeting, this shirt ensures you look sharp and feel cool.
  
  ### Key Features:
  - **Premium Pique Knit:** Breathable and durable fabric for all-day wear.
  - **Classic Ribbed Collar:** Maintains its shape wash after wash.
  - **Athletic Slim Fit:** Modern silhouette that flatters your physique.
  - **Double-Stitched Hem:** Enhanced durability for long-lasting use.
  - **Fade-Resistant Dye:** Vibrant colors that stay true over time.
  
  **Material:** 100% Pique Cotton
  **Quality:** Premium Export Grade
  **Shipping:** Standard and Express options available globally.`,
  image: img,
  images: [img],
  datePosted: new Date().toISOString(),
  fabric: "100% Pique Cotton",
  quality: "Premium",
  sizes: ['S', 'M', 'L', 'XL', 'XXL', 'Normal'],
  colors: ['White', 'Black', 'Navy', 'Sky Blue', 'Burgundy', 'Normal Color'],
  shippingCountry: "Worldwide",
  sellerId: 'seller-2',
  sales: 890,
  badges: ['Trending Product', 'Best Seller'],
  tags: ['polo', 'shirt', 'cotton', 'business casual', 'summer'],
  metaTitle: `Elite Heritage Pique Polo Shirt - Premium Men's Casual Wear | W-LORD MARKET`,
  metaDescription: `Shop our Elite Heritage Pique Polo Shirt. 100% breathable pique cotton, modern slim fit, and classic design. Perfect for golf, work, and casual outings.`,
  metaKeywords: `polo shirt, pique polo, men's fashion, collared shirt, premium polo, casual wear`,
  imageAlt: `Elite Heritage Pique Polo Shirt Color ${idx + 1}`
}));

const NEW_GRAPHIC_TSHIRTS: Product[] = GRAPHIC_TSHIRT_IMAGES.map((img, idx) => ({
  id: `graphic-tshirt-${idx}`,
  name: `graphic-tshirt #${idx + 601}`,
  category: "tshirt",
  price: 25 + (idx % 15) * 0.5 - 2 + 0.99,
  oldPrice: 35.99 + (idx % 5),
  discount: 20,
  rating: 4.6,
  stock: 60,
  description: `Make a statement with our Signature Urban Graphic T-Shirt. Featuring exclusive high-definition artwork on our softest premium cotton, this tee is designed to stand out. With a comfortable modern fit and fade-resistant prints, it's the perfect centerpiece for your streetwear collection.
  
  ### Key Features:
  - **100% Premium Combed Cotton:** Superior softness and breathability.
  - **High-Definition Prints:** Vibrant, detailed graphics that won't fade.
  - **Modern Unisex Fit:** Flattering silhouette for all body types.
  - **Tagless Neck Label:** Eliminates irritation for all-day comfort.
  - **Reinforced Shoulder Seams:** Enhanced durability for frequent wear.
  
  **Material:** 100% Cotton
  **Quality:** Premium Boutique Grade
  **Shipping:** Worldwide shipping available. Tracking provided.`,
  image: img,
  images: [img],
  datePosted: new Date().toISOString(),
  fabric: "100% Cotton",
  quality: "Premium",
  sizes: ['S', 'M', 'L', 'XL', 'XXL', 'Normal'],
  colors: ['Black', 'White', 'Navy', 'Grey', 'Normal Color'],
  shippingCountry: "Worldwide",
  sellerId: 'seller-2',
  sales: 450,
  badges: ['Trending', 'Limited Stock'],
  tags: ['tshirt', 'graphic tee', 'cotton', 'streetwear', 'casual'],
  metaTitle: `Signature Urban Graphic T-Shirt - Exclusive Streetwear Designs | W-LORD MARKET`,
  metaDescription: `Shop our Signature Urban Graphic T-Shirts. Premium combed cotton, high-definition prints, and unique streetwear art. Elevate your casual style today.`,
  metaKeywords: `graphic t-shirt, streetwear tee, printed t-shirt, cotton graphic tee, urban fashion, designer t-shirt`,
  imageAlt: `Signature Urban Graphic T-shirt Design ${idx + 1}`
}));

const NEW_SNEAKERS: Product[] = SNEAKER_IMAGES.map((img, idx) => ({
  id: `sneaker-${idx}`,
  name: `sneaker #${idx + 401}`,
  category: "shoes",
  price: 120 + (idx % 10) * 2 - 8 + 0.99,
  oldPrice: 159.99 + (idx % 5),
  discount: 22,
  rating: 4.9,
  stock: 15,
  description: `Step into the future of footwear with our Elite Urban Performance Sneakers. Combining cutting-edge design with unparalleled support, these sneakers are engineered for those who move. Whether you're hitting the gym or the city streets, experience the perfect blend of style and performance.
  
  ### Key Features:
  - **Advanced Cushioning:** High-rebound sole for maximum impact protection.
  - **Breathable Mesh Upper:** Keeps your feet cool and dry during intense activity.
  - **Dynamic Traction:** Multi-surface grip pattern for superior stability.
  - **Lightweight Construction:** Designed for agility and all-day wearability.
  - **Sleek Aesthetic:** Modern silhouette that complements any athletic or casual outfit.
  
  **Material:** Premium Synthetic & Breathable Mesh
  **Quality:** Professional Grade
  **Shipping:** Securely packaged and shipped worldwide with real-time tracking.`,
  image: img,
  images: [img],
  datePosted: new Date().toISOString(),
  fabric: "Breathable Tech Mesh",
  quality: "Premium",
  sizes: ['7', '8', '9', '10', '11', '12', 'Normal'],
  colors: ['Cloud White', 'Stealth Black', 'Slate Grey', 'Royal Blue', 'Normal Color'],
  shippingCountry: "Worldwide",
  sellerId: 'seller-2',
  sales: 1200,
  badges: ['Best Seller', 'Top Rated'],
  tags: ['sneakers', 'shoes', 'footwear', 'casual', 'sports'],
  metaTitle: `Elite Urban Performance Sneakers - Premium Athletic Footwear | W-LORD MARKET`,
  metaDescription: `Discover the ultimate in comfort and style with our Elite Urban Performance Sneakers. Advanced cushioning, breathable mesh, and superior traction for every move.`,
  metaKeywords: `sneakers, athletic shoes, running shoes, urban footwear, premium sneakers, comfortable shoes`,
  imageAlt: `Elite Urban Performance Sneakers Style ${idx + 1}`
}));

const NEW_BOOTS: Product[] = BOOT_IMAGES.map((img, idx) => ({
  id: `boot-${idx}`,
  name: `boot #${idx + 501}`,
  category: "shoes",
  price: 85 + (idx % 5) * 3 - 5 + 0.99,
  oldPrice: 110.99 + (idx % 3),
  discount: 15,
  rating: 4.8,
  stock: 10,
  description: `Add a touch of sophistication to your look with our Signature Suede Chelsea Boots. Handcrafted from premium suede with a classic silhouette that never goes out of style.
  
  ### Features:
  - Premium Italian suede upper
  - Elastic side panels for easy entry
  - Durable pull tabs
  - Cushioned leather insole
  
  **Material:** Genuine Suede Leather
  **Shipping:** Premium shipping in protective boxes. Worldwide delivery.`,
  image: img,
  images: [img],
  datePosted: new Date().toISOString(),
  fabric: "Genuine Suede Leather",
  quality: "Export Quality",
  sizes: ['40', '41', '42', '43', '44', '45', 'Normal'],
  colors: ['Tan', 'Dark Brown', 'Black', 'Sand', 'Normal Color'],
  shippingCountry: "Worldwide",
  sellerId: 'seller-1',
  sales: 115,
  badges: ['Limited Stock', 'Trending Product'],
  metaTitle: `Signature Suede Chelsea Boots - Luxury Men's Boots | W-LORD MARKET`,
  metaDescription: `Shop handcrafted Signature Suede Chelsea Boots. Premium materials, timeless style, and exceptional comfort.`,
  metaKeywords: `chelsea boots, suede boots, men's boots, luxury footwear, handcrafted shoes`,
  imageAlt: `Signature Suede Chelsea Boot ${idx + 1}`
}));

const NEW_SPORTS_BRAS: Product[] = SPORTS_BRA_IMAGES.map((img, idx) => ({
  id: `sports-bra-${idx}`,
  name: `sports-bra #${idx + 701}`,
  category: "jersey",
  price: 32 + (idx % 10) - 4 + 0.99,
  oldPrice: 45.99 + (idx % 5),
  discount: 25,
  rating: 4.9,
  stock: 50,
  description: `Achieve your fitness goals with the Pro-Support High-Impact Sports Bra. Designed for maximum stability and comfort during your most intense workouts, this bra features advanced moisture-wicking technology and an ergonomic fit that moves with you.
  
  ### Key Features:
  - **Maximum Support:** Ideal for running, HIIT, and high-impact training.
  - **Moisture-Wicking Fabric:** Keeps you cool and dry by pulling sweat away from the skin.
  - **Breathable Mesh Panels:** Enhanced airflow in high-heat zones.
  - **Adjustable Straps:** Personalized fit for all-day comfort.
  - **Chafe-Free Design:** Flatlock seams prevent irritation during movement.
  
  **Material:** 85% Nylon, 15% Spandex
  **Quality:** Premium Athletic Grade
  **Shipping:** Fast global delivery with tracking.`,
  image: img,
  images: [img],
  datePosted: new Date().toISOString(),
  fabric: "Nylon/Spandex Performance Blend",
  quality: "Premium",
  sizes: ['S', 'M', 'L', 'XL', 'Normal'],
  colors: ['Midnight Black', 'Slate Grey', 'Deep Teal', 'Berry Purple', 'Cloud White', 'Normal Color'],
  shippingCountry: "Worldwide",
  sellerId: 'seller-1',
  sales: 280,
  badges: ['Best Seller', 'High Support', 'Breathable'],
  tags: ['sports bra', 'gym', 'fitness', 'underwear', 'yoga'],
  metaTitle: `Pro-Support High-Impact Sports Bra - Professional Gym Wear | W-LORD MARKET`,
  metaDescription: `Shop our high-impact sports bra for maximum support. Breathable, moisture-wicking, and perfect for intense training. Experience the best in athletic support.`,
  metaKeywords: `sports bra, high impact bra, gym wear, athletic apparel, fitness bra, support bra`,
  imageAlt: `Pro-Support Sports Bra Style ${idx + 1}`
}));

const NEW_OVERSIZED_HOODIES: Product[] = OVERSIZED_HOODIE_IMAGES.map((img, idx) => ({
  id: `oversized-hoodie-${idx}`,
  name: `oversized-hoodie #${idx + 801}`,
  category: "hoodie",
  price: 50 + (idx % 10) * 1.5 - 6 + 0.99,
  oldPrice: 75.99 + (idx % 5),
  discount: 30,
  rating: 4.7,
  stock: 40,
  description: `Redefine comfort with the Urban Luxe Oversized Hoodie. Crafted from premium heavyweight cotton blend, this hoodie offers a relaxed, modern silhouette that's perfect for layering or making a statement on its own. It's the ultimate fusion of cozy warmth and streetwear style.
  
  ### Key Features:
  - **Heavyweight Fabric:** Premium feel that provides exceptional warmth and durability.
  - **Relaxed Oversized Fit:** Modern streetwear silhouette for maximum comfort.
  - **Double-Lined Hood:** Extra warmth and a structured look.
  - **Drop Shoulder Design:** Enhances the relaxed aesthetic.
  - **Soft-Brushed Interior:** Incredible softness against the skin.
  
  **Material:** 70% Cotton, 30% Polyester Heavyweight Fleece
  **Quality:** Premium Boutique Quality
  **Shipping:** Worldwide shipping with real-time tracking.`,
  image: img,
  images: [img],
  datePosted: new Date().toISOString(),
  fabric: "Heavyweight Cotton Fleece",
  quality: "Premium",
  sizes: ['S', 'M', 'L', 'XL', 'XXL', 'Normal'],
  colors: ['Washed Grey', 'Midnight Black', 'Cloud White', 'Sand Beige', 'Lime Green', 'Normal Color'],
  shippingCountry: "Worldwide",
  sellerId: 'seller-1',
  sales: 320,
  badges: ['Limited Stock', 'Trending Product', 'Streetwear Essential'],
  tags: ['hoodie', 'oversized', 'baggy', 'winter', 'comfy'],
  metaTitle: `Urban Luxe Oversized Hoodie - Premium Streetwear Fashion | W-LORD MARKET`,
  metaDescription: `Discover the ultimate comfort with our Urban Luxe Oversized Hoodie. Heavyweight fleece, relaxed fit, and modern streetwear style. Perfect for any season.`,
  metaKeywords: `oversized hoodie, streetwear hoodie, heavyweight hoodie, relaxed fit hoodie, premium hoodie, urban fashion`,
  imageAlt: `Urban Luxe Oversized Hoodie Style ${idx + 1}`
}));

const NEW_YOGA_PANTS: Product[] = YOGA_PANTS_IMAGES.map((img, idx) => ({
  id: `yoga-pants-${idx}`,
  name: `yoga-pants #${idx + 901}`,
  category: "shorts",
  price: 38 + (idx % 10) - 4 + 0.99,
  oldPrice: 55.99 + (idx % 5),
  discount: 28,
  rating: 4.9,
  stock: 75,
  description: `Experience total freedom of movement with the Zen-Flex Sculpt High-Waist Yoga Pants. Engineered with our signature four-way stretch fabric and squat-proof technology, these leggings provide a supportive, sculpted fit that stays in place from your first downward dog to your final savasana.
  
  ### Key Features:
  - **High-Waist Support:** Wide waistband for a secure, flattering fit.
  - **Squat-Proof Technology:** Opaque fabric ensures confidence during any movement.
  - **Four-Way Stretch:** Maximum flexibility and shape retention.
  - **Moisture-Wicking:** Keeps you dry and comfortable during intense sessions.
  - **Hidden Pocket:** Convenient storage for keys or cards.
  
  **Material:** 75% Nylon, 25% Elastane
  **Quality:** Premium Studio Grade
  **Shipping:** Global shipping with tracking.`,
  image: img,
  images: [img],
  datePosted: new Date().toISOString(),
  fabric: "Zen-Flex Performance Blend",
  quality: "Premium",
  sizes: ['XS', 'S', 'M', 'L', 'XL', 'Normal'],
  colors: ['Midnight Black', 'Deep Plum', 'Navy Blue', 'Slate Grey', 'Berry Purple', 'Normal Color'],
  shippingCountry: "Worldwide",
  sellerId: 'seller-1',
  sales: 850,
  badges: ['Trending Product', 'Squat Proof', 'Best Seller'],
  metaTitle: `Zen-Flex Sculpt High-Waist Yoga Pants - Premium Leggings | W-LORD MARKET`,
  metaDescription: `Shop our high-waist yoga pants for ultimate flexibility and support. Squat-proof, moisture-wicking, and perfectly sculpted. Ideal for yoga and fitness.`,
  metaKeywords: `yoga pants, leggings, high waist leggings, fitness wear, squat proof leggings, yoga apparel`,
  imageAlt: `Zen-Flex Yoga Pants Style ${idx + 1}`
}));

const NEW_WINTER_JACKETS: Product[] = WINTER_JACKET_IMAGES.map((img, idx) => ({
  id: `winter-jacket-${idx}`,
  name: `winter-jacket #${idx + 1001}`,
  category: "jacket",
  price: 50 + (idx % 10) * 2 - 8 + 0.99,
  oldPrice: 85.99 + (idx % 5),
  discount: 35,
  rating: 4.9,
  stock: 25,
  description: `Conquer the cold with the Arctic Shield Pro Insulated Winter Jacket. Designed for extreme weather, this jacket features a high-performance waterproof shell and advanced thermal insulation to keep you warm and dry in the harshest conditions.
  
  ### Key Features:
  - **Waterproof & Windproof:** High-density nylon shell for total weather protection.
  - **Thermal Insulation:** High-loft synthetic down for superior warmth without the weight.
  - **Adjustable Storm Hood:** Protects against wind and snow.
  - **Multiple Secure Pockets:** Including internal tech pocket and fleece-lined hand warmers.
  - **Reinforced Seams:** Enhanced durability for outdoor adventures.
  
  **Material:** 100% Waterproof Nylon Shell, Synthetic Down Fill
  **Quality:** Heavy-Duty Export Quality
  **Shipping:** Securely packaged for worldwide delivery.`,
  image: img,
  images: [img],
  datePosted: new Date().toISOString(),
  fabric: "Waterproof Tech Nylon",
  quality: "Export Quality",
  sizes: ['M', 'L', 'XL', 'XXL', 'Normal'],
  colors: ['Onyx Black', 'Deep Navy', 'Stealth Grey', 'Forest Green', 'Normal Color'],
  shippingCountry: "Worldwide",
  sellerId: 'seller-1',
  sales: 245,
  badges: ['Limited Stock', 'Extreme Warmth', 'Winter Essential'],
  metaTitle: `Arctic Shield Pro Winter Jacket - Waterproof & Insulated | W-LORD MARKET`,
  metaDescription: `Shop our professional winter jackets for extreme cold. Waterproof shell, high-loft insulation, and durable design. Stay warm this winter.`,
  metaKeywords: `winter jacket, parka, insulated coat, waterproof jacket, outdoor apparel, extreme cold gear`,
  imageAlt: `Arctic Shield Winter Jacket Style ${idx + 1}`
}));

const NEW_SHORTS: Product[] = SHORTS_IMAGES.map((img, idx) => ({
  id: `shorts-${idx}`,
  name: `shorts #${idx + 1101}`,
  category: "shorts",
  price: 30 + (idx % 10) - 5 + 0.99,
  oldPrice: 45.99 + (idx % 5),
  discount: 32,
  rating: 4.7,
  stock: 120,
  description: `Push your limits with the Active-Flow Pro Training Shorts. Designed for high-intensity movement, these shorts feature a lightweight, breathable fabric and a built-in compression liner for maximum support and comfort during any workout.
  
  ### Key Features:
  - **Lightweight Performance Fabric:** Breathable and quick-drying for all-day comfort.
  - **Built-in Compression Liner:** Provides support and prevents chafing.
  - **Side Mesh Panels:** Enhanced ventilation in high-heat areas.
  - **Elastic Waistband:** Secure fit with internal drawstring.
  - **Zip Security Pocket:** Keep your essentials safe while you move.
  
  **Material:** 90% Recycled Polyester, 10% Spandex
  **Quality:** Professional Sport Grade
  **Shipping:** Worldwide shipping with tracking.`,
  image: img,
  images: [img],
  datePosted: new Date().toISOString(),
  fabric: "Recycled Tech Polyester",
  quality: "Premium",
  sizes: ['S', 'M', 'L', 'XL', 'XXL', 'Normal'],
  colors: ['Stealth Black', 'Electric Blue', 'Iron Grey', 'Navy Blue', 'Normal Color'],
  shippingCountry: "Worldwide",
  sellerId: 'seller-1',
  sales: 850,
  badges: ['Best Seller', 'Quick Dry', 'High Performance'],
  metaTitle: `Active-Flow Pro Training Shorts - High-Performance Gym Wear | W-LORD MARKET`,
  metaDescription: `Shop our professional training shorts. Lightweight, breathable, and featuring a built-in liner. Perfect for running, gym, and outdoor sports.`,
  metaKeywords: `training shorts, gym shorts, running shorts, athletic wear, performance shorts`,
  imageAlt: `Active-Flow Training Shorts Style ${idx + 1}`
}));

const NEW_GYM_TANK_TOPS: Product[] = GYM_TANK_IMAGES.map((img, idx) => ({
  id: `gym-tank-${idx}`,
  name: `gym-tank #${idx + 1201}`,
  category: "tshirt",
  price: 25 + (idx % 10) - 3 + 0.99,
  oldPrice: 35.99 + (idx % 5),
  discount: 25,
  rating: 4.6,
  stock: 150,
  description: `Built for the dedicated athlete, the Iron-Core Elite Gym Tank Top offers a tapered fit and dropped armholes for unrestricted movement. Crafted from a premium cotton-poly blend, it provides the perfect balance of softness and durability for your heaviest lifting sessions.
  
  ### Key Features:
  - **Tapered Athletic Fit:** Highlights your physique while allowing full range of motion.
  - **Dropped Armholes:** Maximum ventilation and freedom for shoulder movements.
  - **Soft-Touch Fabric:** Breathable blend that stays comfortable during intense training.
  - **Reinforced Seams:** Built to withstand the rigors of the gym.
  - **Minimalist Branding:** Clean, modern look for in and out of the gym.
  
  **Material:** 60% Cotton, 40% Polyester
  **Quality:** Professional Bodybuilding Grade
  **Shipping:** Worldwide shipping available.`,
  image: img,
  images: [img],
  datePosted: new Date().toISOString(),
  fabric: "Cotton/Poly Performance Blend",
  quality: "Standard",
  sizes: ['S', 'M', 'L', 'XL', 'Normal'],
  colors: ['Onyx Black', 'Pure White', 'Crimson Red', 'Normal Color'],
  shippingCountry: "Worldwide",
  sellerId: 'seller-1',
  sales: 890,
  badges: ['Trending', 'Athlete Choice'],
  tags: ['tank top', 'gym', 'stringer', 'workout', 'fitness'],
  metaTitle: `Iron-Core Elite Gym Tank Top - Professional Bodybuilding Apparel | W-LORD MARKET`,
  metaDescription: `Shop our elite gym tank tops. Tapered fit, dropped armholes, and breathable fabric. Perfect for bodybuilding and heavy lifting.`,
  metaKeywords: `gym tank top, bodybuilding shirt, fitness tank, stringer, athletic apparel`,
  imageAlt: `Iron-Core Gym Tank Top Style ${idx + 1}`
}));

const NEW_JOGGERS: Product[] = JOGGERS_IMAGES.map((img, idx) => ({
  id: `joggers-${idx}`,
  name: `joggers #${idx + 1301}`,
  category: "shorts",
  price: 40 + (idx % 10) - 5 + 0.99,
  oldPrice: 59.99 + (idx % 5),
  discount: 30,
  rating: 4.8,
  stock: 80,
  description: `Experience the perfect fusion of athletic performance and urban style with our Urban Flex Tech-Fleece Joggers. Designed for maximum mobility and comfort, these joggers feature a streamlined tapered fit and premium moisture-wicking fabric. Ideal for intense training sessions or a relaxed day in the city.
  
  ### Key Features:
  - **Tech-Fleece Fabric:** Lightweight warmth without the bulk.
  - **Tapered Athletic Fit:** Modern look with unrestricted movement.
  - **Secure Zip Pockets:** Keep your phone and keys safe during activity.
  - **Adjustable Drawcord:** Elastic waistband for a personalized, secure fit.
  - **Breathable Gusset:** Enhanced ventilation where you need it most.
  
  **Material:** 80% Cotton, 20% Polyester Soft French Terry
  **Quality:** Premium Export Quality
  **Shipping:** Worldwide shipping with real-time tracking.`,
  image: img,
  images: [img],
  datePosted: new Date().toISOString(),
  fabric: "Soft French Terry",
  quality: "Premium",
  sizes: ['S', 'M', 'L', 'XL', 'XXL', 'Normal'],
  colors: ['Grey', 'Black', 'Navy', 'Charcoal', 'Normal Color'],
  shippingCountry: "Worldwide",
  sellerId: 'seller-1',
  sales: 560,
  badges: ['Best Seller', 'High Comfort'],
  metaTitle: `Urban Flex Tech-Fleece Joggers - High-Performance Tapered Sweatpants | W-LORD MARKET`,
  metaDescription: `Discover the Urban Flex Tech-Fleece Joggers. Lightweight warmth, tapered fit, and secure zip pockets. Engineered for training and lifestyle comfort.`,
  metaKeywords: `joggers, tech fleece joggers, tapered sweatpants, gym joggers, athletic pants, streetwear`,
  imageAlt: `Urban Flex Tech-Fleece Joggers Style ${idx + 1}`
}));

const NEW_BACKPACKS: Product[] = BACKPACK_IMAGES.map((img, idx) => ({
  id: `backpack-${idx}`,
  name: `backpack #${idx + 1401}`,
  category: "jersey",
  price: 55 + (idx % 10) * 1.5 - 4 + 0.99,
  oldPrice: 79.99 + (idx % 5),
  discount: 28,
  rating: 4.9,
  stock: 35,
  description: `Navigate your daily journey with the Nomad Elite Multi-Functional Backpack. Crafted from high-density water-resistant materials, this backpack is designed to protect your tech and organize your life. With dedicated compartments for everything from your laptop to your water bottle, it's the ultimate tool for the modern commuter.
  
  ### Key Features:
  - **Water-Resistant Exterior:** Protects your gear from the elements.
  - **Padded 16" Laptop Sleeve:** Shock-absorbent protection for your tech.
  - **Ergonomic Air-Mesh Back:** Maximum breathability and comfort during long carries.
  - **Hidden Anti-Theft Pocket:** Securely store your passport and valuables.
  - **Expandable Side Pockets:** Perfect for water bottles or umbrellas.
  
  **Material:** 1680D Ballistic Nylon
  **Quality:** Heavy-Duty Premium Grade
  **Shipping:** Securely packaged and shipped worldwide with insurance.`,
  image: img,
  images: [img],
  datePosted: new Date().toISOString(),
  fabric: "Ballistic Nylon",
  quality: "Premium",
  sizes: ['One Size', 'Normal'],
  colors: ['Black', 'Grey', 'Navy Blue', 'Normal Color'],
  shippingCountry: "Worldwide",
  sellerId: 'seller-2',
  sales: 210,
  badges: ['Trending Product', 'Durable'],
  metaTitle: `Nomad Elite Multi-Functional Backpack - Water-Resistant Commuter Bag | W-LORD MARKET`,
  metaDescription: `Discover the Nomad Elite Multi-Functional Backpack. Padded laptop protection, water-resistant shell, and ergonomic comfort. The best bag for work and travel.`,
  metaKeywords: `backpack, laptop backpack, travel bag, commuter backpack, water resistant backpack, multi-functional bag`,
  imageAlt: `Nomad Elite Multi-Functional Backpack Style ${idx + 1}`
}));

const NEW_WOOL_SWEATERS: Product[] = WOOL_SWEATER_IMAGES.map((img, idx) => ({
  id: `wool-sweater-${idx}`,
  name: `wool-sweater #${idx + 1501}`,
  category: "jacket",
  price: 55 + (idx % 10) - 5 + 0.99,
  oldPrice: 85.99 + (idx % 5),
  discount: 35,
  rating: 4.8,
  stock: 30,
  description: `Experience the pinnacle of natural warmth with our Heritage Pure Merino Wool Sweater. Crafted from 100% premium Merino wool, this sweater offers a luxurious feel, exceptional breathability, and a timeless aesthetic. It's the perfect layering piece for the sophisticated modern wardrobe.
  
  ### Key Features:
  - **100% Pure Merino Wool:** Naturally soft, warm, and odor-resistant.
  - **Temperature Regulating:** Keeps you warm in the cold and cool when it's mild.
  - **Refined Knit Pattern:** Classic design that works for both casual and formal settings.
  - **Ribbed Neck, Cuffs, and Hem:** Ensures a perfect fit and shape retention.
  - **Lightweight yet Warm:** Ideal for layering without the bulk.
  
  **Material:** 100% Premium Merino Wool
  **Quality:** Boutique Premium Knitwear
  **Shipping:** Worldwide shipping with real-time tracking.`,
  image: img,
  images: [img],
  datePosted: new Date().toISOString(),
  fabric: "100% Merino Wool",
  quality: "Premium",
  sizes: ['S', 'M', 'L', 'XL', 'XXL', 'Normal'],
  colors: ['Classic Cream', 'Deep Navy', 'Heather Charcoal', 'Oatmeal', 'Forest Green', 'Normal Color'],
  shippingCountry: "Worldwide",
  sellerId: 'seller-2',
  sales: 245,
  badges: ['Limited Stock', 'Pure Wool', 'Eco-Friendly'],
  metaTitle: `Heritage Pure Merino Wool Sweater - Luxury Knitwear | W-LORD MARKET`,
  metaDescription: `Shop our 100% pure Merino wool sweaters. Soft, warm, and elegantly designed. Experience the best in natural knitwear.`,
  metaKeywords: `wool sweater, merino wool, knitwear, luxury sweater, men's knitwear, premium wool`,
  imageAlt: `Heritage Wool Sweater Style ${idx + 1}`
}));

const NEW_BLAZERS: Product[] = BLAZER_IMAGES.map((img, idx) => ({
  id: `blazer-${idx}`,
  name: `blazer #${idx + 1601}`,
  category: "jacket",
  price: 90 + (idx % 10) * 2 - 5 + 0.99,
  oldPrice: 129.99 + (idx % 5),
  discount: 30,
  rating: 4.7,
  stock: 20,
  description: `Elevate your professional presence with the Executive Modern Slim-Fit Blazer. Tailored for a sharp, contemporary silhouette, this blazer is crafted from a premium wool-blend fabric that offers both comfort and a sophisticated drape. Perfect for the boardroom or high-end social events.
  
  ### Key Features:
  - **Tailored Slim Fit:** Modern silhouette that enhances your frame.
  - **Premium Wool Blend:** Breathable, durable, and wrinkle-resistant fabric.
  - **Classic Notch Lapel:** Timeless design for professional versatility.
  - **Functional Pockets:** Including internal chest pocket for essentials.
  - **Smooth Inner Lining:** Ensures a comfortable fit and easy layering.
  
  **Material:** 60% Wool, 40% Polyester
  **Quality:** Premium Export Tailoring
  **Shipping:** Shipped in protective garment bags worldwide.`,
  image: img,
  images: [img],
  datePosted: new Date().toISOString(),
  fabric: "Premium Wool Blend",
  quality: "Export Quality",
  sizes: ['38R', '40R', '42R', '44R', '46R', 'Normal'],
  colors: ['Midnight Navy', 'Classic Black', 'Slate Grey', 'Charcoal', 'Tan', 'Normal Color'],
  shippingCountry: "Worldwide",
  sellerId: 'seller-1',
  sales: 125,
  badges: ['Trending', 'Executive Choice', 'Premium Tailoring'],
  metaTitle: `Executive Modern Slim-Fit Blazer - Professional Tailored Wear | W-LORD MARKET`,
  metaDescription: `Shop our modern slim-fit blazers. Premium wool blend, sharp tailoring, and perfect for professional settings. Elevate your style today.`,
  metaKeywords: `blazer, slim fit blazer, men's suit jacket, professional wear, tailored blazer, executive fashion`,
  imageAlt: `Executive Slim-Fit Blazer Style ${idx + 1}`
}));

const NEW_CAPS: Product[] = CAP_IMAGES.map((img, idx) => ({
  id: `cap-${idx}`,
  name: `Cap`,
  category: "cap",
  price: 30.00,
  oldPrice: 45.00,
  discount: 33,
  rating: 4.9,
  stock: 100,
  description: `Premium quality athletic cap designed for both performance and style. Featuring breathable fabric and an adjustable strap for the perfect fit. Ideal for sports, outdoor activities, or casual streetwear.
  
  ### Key Features:
  - **Breathable Fabric:** Keeps you cool during intense activities.
  - **Adjustable Strap:** One size fits most with a secure, comfortable fit.
  - **Durable Construction:** Built to last through every adventure.
  - **Classic Design:** Timeless aesthetic that complements any outfit.
  
  **Material:** 100% Cotton Twill
  **Quality:** Premium Export Grade
  **Shipping:** Fast worldwide shipping available.`,
  image: img,
  images: [img],
  datePosted: new Date().toISOString(),
  fabric: "100% Cotton Twill",
  quality: "Premium",
  sizes: ['One Size', 'Normal'],
  colors: ['Black', 'Navy', 'White', 'Normal Color'],
  shippingCountry: "Worldwide",
  sellerId: 'seller-1',
  sales: 150,
  badges: ['New Arrival', 'Trending'],
  metaTitle: `Premium Athletic Cap - Stylish & Breathable Headwear | W-LORD MARKET`,
  metaDescription: `Shop our premium athletic cap. Breathable cotton twill, adjustable fit, and classic style. Perfect for sports and casual wear.`,
  metaKeywords: `cap, hat, athletic cap, sports hat, streetwear, accessories`,
  imageAlt: `Premium Athletic Cap`
}));

const ELECTRONICS_IMAGES = [
  "https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1526733158173-e1b2317199a1?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&q=80&w=800"
];

const BOOKS_IMAGES = [
  "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&q=80&w=800"
];

const NEW_ELECTRONICS: Product[] = ELECTRONICS_IMAGES.map((img, idx) => ({
  id: `electronics-${idx}`,
  name: `Smart Electronic Device #${idx + 1}`,
  category: "electronics",
  price: 199.99 + (idx * 50),
  rating: 4.5,
  stock: 20,
  description: "High-quality electronic device for your modern lifestyle.",
  image: img,
  images: [img],
  datePosted: new Date().toISOString(),
  sellerId: 'seller-1',
  sales: 50,
  tags: ['electronics', 'gadget', 'tech']
}));

const NEW_BOOKS: Product[] = BOOKS_IMAGES.map((img, idx) => ({
  id: `books-${idx}`,
  name: `Best Selling Book #${idx + 1}`,
  category: "books",
  price: 24.99 + (idx * 5),
  rating: 4.8,
  stock: 100,
  description: "A must-read book that spans several genres.",
  image: img,
  images: [img],
  datePosted: new Date().toISOString(),
  sellerId: 'seller-1',
  sales: 120,
  tags: ['books', 'education', 'literature']
}));

const SPORT_UNIFORM_IMAGES = [
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1775314404/IMG-20260403-WA0005_apw7wk.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1775314470/IMG_20260404_122022_478_pvfm5r.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1775314473/IMG_20260404_130207_508_gxclti.jpg"
];

const NEW_SPORT_UNIFORMS: Product[] = SPORT_UNIFORM_IMAGES.map((img, idx) => ({
  id: `sport-uniform-${idx}`,
  name: `Professional Team Uniform #${idx + 1}`,
  category: "jersey",
  price: 45.00,
  rating: 4.9,
  stock: 100,
  description: "Elite performance team uniform. Full sublimation.",
  image: img,
  images: [img],
  datePosted: new Date().toISOString(),
  sellerId: 'seller-1',
  sales: 300,
  tags: ['jersey', 'sports', 'teamwear']
}));

export const PRODUCTS: Product[] = [
  ...NEW_HOODIES,
  ...NEW_TRACKSUITS,
  ...NEW_POLOS,
  ...NEW_GRAPHIC_TSHIRTS,
  ...NEW_SNEAKERS,
  ...NEW_BOOTS,
  ...NEW_SPORTS_BRAS,
  ...NEW_OVERSIZED_HOODIES,
  ...NEW_YOGA_PANTS,
  ...NEW_WINTER_JACKETS,
  ...NEW_SHORTS,
  ...NEW_GYM_TANK_TOPS,
  ...NEW_JOGGERS,
  ...NEW_BACKPACKS,
  ...NEW_WOOL_SWEATERS,
  ...NEW_BLAZERS,
  ...NEW_CAPS,
  ...NEW_ELECTRONICS,
  ...NEW_BOOKS,
  ...NEW_SPORT_UNIFORMS
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'Why Factory Direct Pricing is Changing the Game',
    slug: 'factory-direct-pricing-benefits',
    excerpt: 'Discover how buying directly from manufacturers saves you up to 70% on premium sportswear.',
    content: 'Buying directly from the source eliminates middlemen, reducing costs significantly while maintaining high quality...',
    category: 'Industry News',
    image: 'https://picsum.photos/seed/industry/800/400',
    date: '2025-02-20',
    author: 'W-LORD MARKET Team',
    tags: ['Factory Direct', 'Savings', 'Ecommerce']
  },
  {
    id: 'blog-2',
    title: 'Top 5 Trends in Global Sportswear for 2025',
    slug: 'sportswear-trends-2025',
    excerpt: 'From sustainable fabrics to smart integration, here is what is trending in the world of sports apparel.',
    content: 'The sportswear industry is evolving rapidly. Sustainability is no longer an option but a requirement...',
    category: 'Trends',
    image: 'https://picsum.photos/seed/trends/800/400',
    date: '2025-02-25',
    author: 'Design Team',
    tags: ['Trends', 'Sportswear', '2025']
  }
];

export const MOCK_ORDERS: SaleRecord[] = [
  {
    id: 'ORD-1001',
    products: [{ productId: 'hoodie-0', name: 'Professional Team Jersey', price: 150.00, quantity: 1 }],
    customerName: 'John Smith',
    customerPhone: '+1 234 567 890',
    customerEmail: 'john@example.com',
    customerAddress: 'Manchester, UK',
    customerCity: 'Manchester',
    customerCountry: 'United Kingdom',
    customerZip: 'M1 1AA',
    amount: 150.00,
    date: '2024-03-20',
    status: 'Shipped',
    sellerId: 'seller-1',
    sellerShopName: 'Elite Gear'
  },
  {
    id: 'ORD-1002',
    products: [{ productId: 'hoodie-1', name: 'Elite Training Shorts', price: 85.00, quantity: 1 }],
    customerName: 'Sarah Wilson',
    customerPhone: '+1 987 654 321',
    customerEmail: 'sarah@example.com',
    customerAddress: 'London, UK',
    customerCity: 'London',
    customerCountry: 'United Kingdom',
    customerZip: 'SW1 1AA',
    amount: 85.00,
    date: '2024-03-21',
    status: 'Processing',
    sellerId: 'seller-1',
    sellerShopName: 'Elite Gear'
  },
  {
    id: 'ORD-1003',
    products: [{ productId: 'hoodie-2', name: 'Performance Hoodie', price: 120.00, quantity: 1 }],
    customerName: 'Mike Ross',
    customerPhone: '+1 111 222 333',
    customerEmail: 'mike@example.com',
    customerAddress: 'New York, USA',
    customerCity: 'New York',
    customerCountry: 'United States',
    customerZip: '10001',
    amount: 120.00,
    date: '2024-03-22',
    status: 'Delivered',
    sellerId: 'seller-1',
    sellerShopName: 'Elite Gear'
  }
];

export const MOCK_SALES = Array.from({ length: 12 }).map((_, i) => ({
  month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i],
  sales: 4000 + Math.floor(Math.random() * 8000),
  customers: 120 + Math.floor(Math.random() * 300)
}));

export const MOCK_CUSTOMERS: Customer[] = [
  { id: 'c1', name: 'John Doe', email: 'john@example.com', orderCount: 5, totalSpent: 1250, location: 'New York, USA', lastOrderDate: '2024-12-01' },
  { id: 'c2', name: 'Sarah Smith', email: 'sarah.s@sports.co', orderCount: 12, totalSpent: 4300, location: 'London, UK', lastOrderDate: '2025-01-15' },
  { id: 'c3', name: 'Mike Johnson', email: 'mike@club.org', orderCount: 2, totalSpent: 450, location: 'Berlin, DE', lastOrderDate: '2024-11-20' },
  { id: 'c4', name: 'Elite Academy', email: 'procurement@elite.edu', orderCount: 45, totalSpent: 28900, location: 'Dubai, UAE', lastOrderDate: '2025-02-10' },
];
