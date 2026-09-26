
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MessageCircle, 
  Star, 
  ShieldCheck, 
  Globe, 
  Zap, 
  Award, 
  Users, 
  X, 
  Maximize2, 
  ZoomIn,
  ChevronRight,
  Info,
  Search,
  ChevronDown
} from 'lucide-react';
import { ADMIN_WHATSAPP } from '../constants';
import { getWhatsAppLink } from '../services/routingUtils';

const SportStore: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  const categories = [
    {
      id: "t-shirts",
      title: "T-Shirts",
      description: "Custom Full Sublimated Shirts. 100% moisture management / antimicrobial performance fabric. Available in all sizes (S to 7XL). Premium quality, breathable, long-lasting prints. Perfect for all sports teams worldwide.",
      sizeInfo: "Sizes: S to 7XL. Standard athletic fit. Custom sizing available upon request.",
      colorNote: "Note: Any color combination or custom pattern can be manufactured.",
      price: 22,
      images: [
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1774961389/IMG-20260329-WA0006_ztxqy5.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1774961392/IMG-20260329-WA0001_w6wv6h.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1774961393/IMG-20260329-WA0002_pk31td.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1774961397/IMG-20260329-WA0000_muyyzt.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1774961401/IMG-20260329-WA0003_hmkv8s.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1774961380/IMG-20260329-WA0005_jib82r.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1774961382/IMG-20260329-WA0004_ygusyt.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1774961377/IMG-20260329-WA0011_dx4dhm.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1774961374/IMG-20260329-WA0008_ud3qrb.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1774961372/IMG-20260329-WA0007_hrkpww.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1774961367/IMG-20260329-WA0010_xnferi.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1774961368/IMG-20260329-WA0012_yarsvd.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1774961371/IMG-20260329-WA0009_istzgx.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1774961273/IMG-20260329-WA0043_ylbill.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1774961283/IMG-20260329-WA0042_piep4a.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1774961284/IMG-20260329-WA0039_l06lho.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1774961251/IMG-20260329-WA0049_vxtobb.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1774961258/IMG-20260329-WA0045_kzx4nl.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1774961260/IMG-20260329-WA0044_kmeqez.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1774961250/IMG-20260329-WA0018_uxs5h8.jpg"
      ]
    },
    {
      id: "hoodies",
      title: "Hoodies",
      description: "Premium Branded Hoodies. Heavyweight fleece fabric for maximum warmth and comfort. Durable stitching and high-quality finishes.",
      sizeInfo: "Sizes: S to 5XL. Relaxed fit. Ribbed cuffs and waistband.",
      colorNote: "Available in solid colors and custom sublimated designs.",
      price: 50,
      images: [
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1774960832/IMG-20260329-WA0166_ok6rhn.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1774960835/IMG-20260329-WA0168_ivlybd.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1774960848/IMG-20260329-WA0163_glsfak.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1774960853/IMG-20260329-WA0162_f4arjo.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1774960854/IMG-20260329-WA0164_pmff1o.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1774960855/IMG-20260329-WA0167_vez3fj.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1774961238/IMG-20260329-WA0056_rcfzbo.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1774961240/IMG-20260329-WA0051_gbziqz.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1774961243/IMG-20260329-WA0058_oo3h01.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1774961246/IMG-20260329-WA0054_tmc0td.jpg"
      ]
    },
    {
      id: "shorts",
      title: "Shorts",
      description: "Athletic Performance Shorts. Lightweight, quick-dry fabric with reinforced seams. Ideal for intense training and matches.",
      sizeInfo: "Sizes: S to 4XL. Elastic waistband with internal drawstring.",
      colorNote: "Custom team colors and logos available.",
      price: 30,
      images: [
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1774961152/IMG-20260329-WA0080_qplop8.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1774961156/IMG-20260329-WA0084_fd4hmp.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1774961166/IMG-20260329-WA0078_afxatg.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1774961169/IMG-20260329-WA0079_uzhxvo.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1774961169/IMG-20260329-WA0076_k0jgjc.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1774961135/IMG-20260329-WA0085_ktcwb9.jpg"
      ]
    },
    {
      id: "joggers",
      title: "Joggers or Sweatpants",
      description: "Premium Comfort Joggers. Soft fleece interior with a durable outer shell. Perfect for warm-ups, training, or casual athletic wear.",
      sizeInfo: "Sizes: S to 5XL. Tapered fit with adjustable drawstring.",
      colorNote: "Available in multiple solid colors and custom side-stripe designs.",
      price: 40,
      images: [
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1774961095/IMG-20260329-WA0103_qfh2o8.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1774961098/IMG-20260329-WA0101_j0znnv.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1774961110/IMG-20260329-WA0100_qajbtl.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1774961099/IMG-20260329-WA0102_obpt6s.jpg"
      ]
    },
    {
      id: "basketball",
      title: "Basketball Uniforms",
      description: "Elite Basketball Uniforms. Professional grade moisture-wicking fabric. Full sublimation printing for vibrant, permanent team colors.",
      sizeInfo: "Sizes: Youth to Adult 7XL. Pro-cut and standard fit.",
      colorNote: "Custom team branding, names, and numbers included.",
      price: 40,
      images: [
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1775314404/IMG-20260403-WA0005_apw7wk.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1775314404/IMG-20251004-WA0021_rcxkag.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1775314470/IMG_20260404_122022_478_pvfm5r.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1775314470/IMG_20260404_122913_340_byllke.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1775314470/IMG_20260404_121458_602_oviyaj.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1775314471/IMG_20260404_130428_754_suuztm.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1775314471/IMG_20260404_121448_613_gpspoc.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1775314463/IMG_20260329_234621_277_qpj8ae.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1775314465/IMG_20260404_125733_655_r4rsoe.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1775314468/IMG_20260404_125948_358_h9jofr.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1775314469/IMG_20260404_125921_272_xdqdxk.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1775314469/IMG_20260404_124106_119_uwddik.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1775314462/IMG_20260329_234726_136_i38d03.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1775314462/IMG_20260329_234635_096_amgs8y.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1775314463/IMG_20260329_234630_259_bmzljp.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1775314463/IMG_20260329_234626_676_n0us3z.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1775314462/IMG_20260329_234639_600_nntqmd.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1775314451/FB_IMG_1770050000637_n03fid.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1775314453/FB_IMG_1770049999983_ffucos.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1775314458/IMG_20260404_120737_313_va0thn.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1775314458/IMG_20260404_120747_489_qzk3hl.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1775314461/IMG_20260404_120643_641_cbzcy3.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1775314436/FB_IMG_1724001557965_pmehfk.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1775314444/FB_IMG_1738162597321_dnsfd3.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1775314449/FB_IMG_1770050014238_bs34sy.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1775314450/FB_IMG_1770050013005_nrxgwv.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1775314450/FB_IMG_1770050001847_qz2ybs.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1774960800/IMG-20260329-WA0176_dzneee.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1774960809/IMG-20260329-WA0172_sqgmzv.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1774960814/IMG-20260329-WA0171_qqn1mi.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1774960819/IMG-20260329-WA0173_t5tbdx.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1774960830/IMG-20260329-WA0174_xmko3h.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1774960791/IMG-20260329-WA0177_u11taw.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1774960795/IMG-20260329-WA0178_1_zcboez.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1774960798/IMG-20260329-WA0179_bxzxuj.jpg"
      ]
    },
    {
      id: "american-football",
      title: "American Football",
      description: "Heavy-Duty American Football Jerseys. Reinforced stitching and durable, breathable mesh. Designed for maximum impact and performance.",
      sizeInfo: "Sizes: S to 7XL. Custom fit for pads.",
      colorNote: "Full sublimation printing for unlimited design options.",
      price: 30,
      images: [
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1775314440/FB_IMG_1724666104998_n8sgfo.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1775314441/FB_IMG_1724665865425_uuaqlv.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1775314441/FB_IMG_1724665878357_gn9smm.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1775314447/FB_IMG_1733158448323_ue2nli.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1775314473/IMG_20260404_130207_508_gxclti.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1775314424/FB_IMG_1684161955191_g7yjep.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1775314424/FB_IMG_1684161957207_vfjbry.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1775314430/received_935060828488839_zp3pck.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1775314432/received_999978364926997_kn4rb0.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1775314439/FB_IMG_1724666109368_amyy7e.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1775314421/FB_IMG_1680141621885_dnkjks.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1775314421/FB_IMG_1684162002489_vpxqqj.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1775314421/FB_IMG_1684161999209_qy3f6s.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1775314423/FB_IMG_1684161966590_oblaus.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1775314423/FB_IMG_1684161961512_rm9az7.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1775314417/IMG-20231201-WA0079_c6c3ql.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1775314418/IMG_20231207_152917_195_z9c21i.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1775314420/FB_IMG_1680141652449_eq94vw.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1775314420/FB_IMG_1680141643468_gsjjkf.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1775314421/FB_IMG_1680141630592_lb6je5.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1775314415/IMG-20231201-WA0072_stewkq.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1775314415/IMG-20231201-WA0083_ypmqie.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1775314416/IMG-20231201-WA0082_uhvzl0.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1775314416/IMG-20231201-WA0081_esn52c.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1775314416/IMG-20231201-WA0080_nbhqiy.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1775314413/IMG-20231201-WA0077_dpy8xg.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1775314413/IMG-20231201-WA0076_fbl4fn.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1775314414/IMG-20231201-WA0074_ly4e5o.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1775314414/IMG-20231201-WA0071_hyicnu.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1775314414/IMG-20231201-WA0073_ddb9qq.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1775149147/Gemini_Generated_Image_yub0zyub0zyub0zy_2_fvk1c4.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1775149147/7321103b-f6ea-4cd7-97f4-9aaa3dbb41d7_e9xrjd.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1775149147/7f4d8cb2-20a7-454c-9e23-263d09cc8393_f8ju6r.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1775149146/images_3_knk6qn.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1775149146/Gemini_Generated_Image_yub0zyub0zyub0zy_1_k0kmlg.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1775149147/download_itof1q.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1775149152/c3d27860-7da5-4c75-ada8-5566a4ff6607_sfsq7j.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1775149147/images_1_d8ajjf.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1775149147/images_nyvdwy.jpg"
      ]
    },
    {
      id: "ice-hockey",
      title: "Ice Hockey",
      description: "Professional Ice Hockey Jerseys. Heavyweight, durable fabric built for the rink. Full sublimation for permanent, vibrant team graphics.",
      sizeInfo: "Sizes: S to 7XL. Oversized fit for equipment.",
      colorNote: "Custom designs and numbering available.",
      price: 40,
      images: [
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1775314451/IMG_20241102_105026_390_mtigej.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1775314455/IMG_20241102_105036_900_hswasz.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1775314456/IMG_20241102_105032_036_zfg38b.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1775314456/IMG_20241102_105034_085_afcltx.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1775314457/IMG_20241102_105029_502_dhvbvn.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1775314404/IMG-20251004-WA0021_rcxkag.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1775314404/IMG_20241118_080307_060_zzkm0e.webp",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1775314427/Iowa_Dogfish_Ice_Hockey_Jersey_etxfvt.png",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1775149159/cffb7619-ded1-4c8c-85b4-3377f7479a67_y1trgy.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1775149159/ec56e344-00cb-4a41-a925-5d5af138e3ac_bbc2d9.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1775149158/975bb564-80fc-489d-ac4a-a86fb9192abb_bbb8vb.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1775149157/152ec69a-1fbf-4fd3-b184-02c284b89e6d_ti6n56.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1775149156/eff0c5c9-ab21-4a84-9537-d6481ddf6fba_zppu35.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1775149162/add53e4b-e08b-41d9-9e1a-9d6b08245299_odqp43.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1775149161/dd17f6cd-571e-446f-ad45-952d4842db2a_ndpit0.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1775149161/30c28daf-ea24-41e4-84c2-92cfa2c9f800_rd4pwu.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1775149161/3607d31f-f87d-414c-9269-0b76777d8e1f_l0nq1i.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1775149163/a58225c6-6e81-408d-a819-80693862aebc_gywz9c.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1775149164/f48b3f7a-a487-483d-9569-dd1cfd5b8f02_qicbp6.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1775149152/Gemini_Generated_Image_yub0zyub0zyub0zy_3_n49z8n.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1775149152/Gemini_Generated_Image_yub0zyub0zyub0zy_4_r8j9u2.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1775149152/Gemini_Generated_Image_yub0zyub0zyub0zy_5_m1v3p4.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1775149152/Gemini_Generated_Image_yub0zyub0zyub0zy_6_q7k8l9.jpg"
      ]
    },
    {
      id: "baseball-bats",
      title: "Baseball Bats",
      description: "Professional Grade Baseball Bats. Balanced for power and precision. Available in various weights and lengths for elite performance.",
      sizeInfo: "Sizes: 31\" to 34\". Custom weight drops available.",
      colorNote: "Premium finish with custom grip options.",
      price: 150,
      images: [
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1774960700/IMG-20260331-WA0008_zeiemi.jpg"
      ]
    },
    {
      id: "baseball",
      title: "Baseball Jerseys",
      description: "Custom Baseball Jerseys. High-quality materials for peak performance on the diamond. Full sublimation printing.",
      sizeInfo: "Jerseys: S to 7XL. Pro-cut and standard fit.",
      colorNote: "Unlimited design possibilities. Match your team's exact branding.",
      price: 35,
      images: [
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1774960774/IMG-20260331-WA0005_nqzk64.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1774960776/IMG-20260331-WA0006_kxswgs.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1774960779/IMG-20260331-WA0004_aav3gq.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1774960780/IMG-20260331-WA0003_o8je2k.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1774960795/IMG-20260331-WA0002_dpyvz8.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1774960761/IMG-20260331-WA0007_pywcoz.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1774960765/IMG-20260331-WA0008_dijbqz.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1775149216/Gemini_Generated_Image_96bxvd96bxvd96bx_amsbbi.png",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1775149219/4fe70d5f-1738-461d-ad7d-c1250ab268cf_hmceok.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1775149225/Gemini_Generated_Image_9gmjgc9gmjgc9gmj_hm8thv.png",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1775149219/Gemini_Generated_Image_ddqesaddqesaddqe_hp1dnu.png",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1775149225/Gemini_Generated_Image_1x7s311x7s311x7s_kzkm3k.png",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1775149210/4d51148e-ce06-4509-9fc2-8f26947aba47_ito0mc.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1775149214/7e8765aa-b380-425a-a0e1-277cbcabf763_qtfm5v.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1775149214/597a9cde-7f92-4ebe-a109-8fdc16b66602_xbyak1.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1775314437/FB_IMG_1730732342446_iefc6v.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1775314437/FB_IMG_1730732094177_vcvpuu.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1775314446/FB_IMG_1737742141579_byhget.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1775314445/FB_IMG_1737742150992_mwincn.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1775314472/IMG_20260404_130328_277_kyppmp.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1775314428/received_1163404058060735_drd6qv.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1775314429/received_1031690138739014_ymcxbv.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1775314431/received_1189840408903186_qfu91u.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1775314432/received_1191430735234039_ktixp1.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1775314436/received_391719473688861_ewynh2.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1775314405/facebook_-7131438102794016324_jpg_oxupdb.webp",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1775314426/received_1206655383734790_agerl0.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1775314427/FB_IMG_1684162012389_ogg4jz.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1775314427/received_858109183161447_pvp6wd.jpg"
      ]
    },
    {
      id: "caps",
      title: "Caps & Headwear",
      description: "Custom Branded Caps. High-quality embroidery and durable materials. Perfect for teams, fans, and corporate branding.",
      sizeInfo: "Sizes: One size fits most (Adjustable). Structured and unstructured options.",
      colorNote: "Available in multiple colorways with custom logo placement.",
      price: 30,
      images: [
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1774961041/IMG-20260329-WA0119_ws0icb.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1774961050/IMG-20260329-WA0114_kp2v8q.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1774961049/IMG-20260329-WA0116_pndnb3.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1774961050/IMG-20260329-WA0112_pp3m6e.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1774961066/IMG-20260329-WA0113_efnujj.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1774961021/IMG-20260329-WA0125_p2bl6o.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1774961030/IMG-20260329-WA0115_disphb.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1774961038/IMG-20260329-WA0120_sxw9n1.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1774961039/IMG-20260329-WA0118_rqylia.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1774961040/IMG-20260329-WA0117_azcjio.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1774961010/IMG-20260329-WA0123_nvgdls.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1774961011/IMG-20260329-WA0124_mnaer3.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1774961014/IMG-20260329-WA0126_gkpujp.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1774961017/IMG-20260329-WA0122_tbeg7d.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1774961018/IMG-20260329-WA0121_q4denz.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1774960982/IMG-20260329-WA0130_er5i2m.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1774960989/IMG-20260329-WA0129_z8k7wk.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1774960992/IMG-20260329-WA0134_kfyanj.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1774960992/IMG-20260329-WA0131_hzzut9.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1774960994/IMG-20260329-WA0127_aexm3r.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1774960960/IMG-20260329-WA0137_o0ozhx.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1774960967/IMG-20260329-WA0136_bcmggp.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1774960969/IMG-20260329-WA0133_gpur8o.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1774960982/IMG-20260329-WA0128_u37hpi.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1774960976/IMG-20260329-WA0132_tekted.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1774960953/IMG-20260329-WA0138_l77ia7.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1774960954/IMG-20260329-WA0140_o8kkp9.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1774960957/IMG-20260329-WA0141_qkrkjq.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1774960958/IMG-20260329-WA0135_nhcqhb.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1774960928/IMG-20260329-WA0145_hiebug.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1774960937/IMG-20260329-WA0143_qkhutk.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1774960937/IMG-20260329-WA0144_kgyzcm.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1774960948/IMG-20260329-WA0139_jnnes3.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1774960948/IMG-20260329-WA0142_reargj.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1774960908/IMG-20260329-WA0149_sdfs85.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1774960909/IMG-20260329-WA0151_ttyer7.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1774960916/IMG-20260329-WA0147_lurhzy.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1774960918/IMG-20260329-WA0148_zggf6w.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1774960920/IMG-20260329-WA0146_wrhkxt.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1774960884/IMG-20260329-WA0155_wlkpvo.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1774960884/IMG-20260329-WA0153_m3mcww.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1774960888/IMG-20260329-WA0159_xktvrz.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1774960893/IMG-20260329-WA0157_yhqnxo.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1774960857/IMG-20260329-WA0160_dhkdzz.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1774960864/IMG-20260329-WA0158_tp7sks.jpg",
        "https://res.cloudinary.com/dc0ytviey/image/upload/v1774960868/IMG-20260329-WA0156_wdrvjk.jpg"
      ]
    },
  ];

  const handleWhatsAppOrder = (productName: string) => {
    const message = `Hello, I am interested in ordering the ${productName} from your Sport Store. Please provide more details.`;
    window.location.href = getWhatsAppLink(ADMIN_WHATSAPP, message);
  };

  const filteredCategories = useMemo(() => {
    return categories
      .filter(cat => activeCategory === 'all' || cat.id === activeCategory)
      .map(cat => {
        if (!searchQuery.trim()) return cat;
        const filteredImages = cat.images.filter((_, idx) => {
          const searchTerms = searchQuery.toLowerCase().split(' ');
          const itemName = `${cat.title} Design #${idx + 1}`.toLowerCase();
          return searchTerms.every(term => itemName.includes(term) || cat.title.toLowerCase().includes(term));
        });
        return { ...cat, images: filteredImages };
      })
      .filter(cat => cat.images.length > 0);
  }, [searchQuery, activeCategory]);

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      {/* Sticky WhatsApp Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        onClick={() => handleWhatsAppOrder('General Inquiry')}
        className="fixed bottom-8 right-8 z-50 bg-green-500 text-white p-4 rounded-full shadow-2xl flex items-center justify-center hover:bg-green-600 transition-colors"
      >
        <MessageCircle size={32} />
      </motion.button>

      {/* Hero Section */}
      <header className="relative py-20 bg-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <img 
            src="https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&q=80&w=1920" 
            alt="Stadium" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter mb-6"
          >
            I Am a Manufacturer & Supplier of <span className="text-blue-500">Premium Sports Uniforms</span> Worldwide
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-4xl mx-auto text-lg md:text-xl text-gray-300 leading-relaxed font-medium"
          >
            I am a direct factory manufacturer with years of experience in producing high-quality sports uniforms. We design and manufacture all types of uniforms including Football, Basketball, Baseball, American Football, Ice Hockey, Gym Wear, and more. Our products are exported worldwide with premium quality, custom designs, and affordable pricing.
          </motion.p>
        </div>
      </header>

      {/* Trust Bar */}
      <div className="bg-gray-100 py-4 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center gap-8 md:gap-16 text-xs font-bold uppercase tracking-widest text-gray-500">
          <div className="flex items-center gap-2"><ShieldCheck size={16} className="text-green-500" /> Factory Direct</div>
          <div className="flex items-center gap-2"><Globe size={16} className="text-blue-500" /> Worldwide Shipping</div>
          <div className="flex items-center gap-2"><Award size={16} className="text-yellow-500" /> Premium Quality</div>
          <div className="flex items-center gap-2"><Users size={16} className="text-purple-500" /> Custom Teamwear</div>
        </div>
      </div>

      {/* Bulk Order Offers Section */}
      <section className="bg-blue-50 py-16 border-y border-blue-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter text-gray-900 mb-4"
            >
              🔥 Bulk Order Special Discounts
            </motion.h2>
            <p className="text-gray-600 font-bold uppercase tracking-widest text-sm">
              Save more when you order for your entire team or league
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { range: "10 to 50", discount: "5%" },
              { range: "50 to 100", discount: "10%" },
              { range: "100 to 200", discount: "10%" },
              { range: "200 to 500", discount: "15%" },
              { range: "500 to 1000", discount: "20%" },
              { range: "1000 to 5000", discount: "30%" },
              { range: "5000 to 10000", discount: "50%" },
            ].map((offer, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-2xl border-2 border-blue-200 shadow-sm flex flex-col items-center text-center group hover:border-blue-500 transition-all"
              >
                <span className="text-gray-500 text-xs font-black uppercase tracking-widest mb-2">Order Quantity</span>
                <span className="text-xl font-black text-gray-900 mb-4">{offer.range} Pieces</span>
                <div className="bg-blue-600 text-white px-4 py-2 rounded-full font-black text-lg shadow-lg shadow-blue-600/20 group-hover:bg-blue-700">
                  Get {offer.discount} OFF
                </div>
              </motion.div>
            ))}
            {/* Special Contact Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              whileHover={{ y: -5 }}
              className="bg-gray-900 p-6 rounded-2xl border-2 border-gray-800 shadow-sm flex flex-col items-center text-center group hover:border-blue-500 transition-all"
            >
              <span className="text-gray-400 text-xs font-black uppercase tracking-widest mb-2">Custom Quote</span>
              <span className="text-xl font-black text-white mb-4">Larger Orders</span>
              <button 
                onClick={() => handleWhatsAppOrder('Bulk Order Inquiry')}
                className="bg-white text-gray-900 px-4 py-2 rounded-full font-black text-lg shadow-lg shadow-white/10 group-hover:bg-blue-500 group-hover:text-white transition-colors"
              >
                Contact Us
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Sport Navigation & Search Bar */}
      <div className="sticky top-[164px] md:top-[120px] z-40 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Category Dropdown/Selector */}
          <div className="relative w-full md:w-64">
            <button 
              onClick={() => setIsCategoryOpen(!isCategoryOpen)}
              className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-black uppercase tracking-widest text-gray-900 hover:bg-gray-100 transition-colors"
            >
              <span className="flex items-center gap-2">
                <ChevronDown size={16} className={`transition-transform duration-300 ${isCategoryOpen ? 'rotate-180' : ''}`} />
                {activeCategory === 'all' ? 'All Collections' : categories.find(c => c.id === activeCategory)?.title}
              </span>
            </button>
            <AnimatePresence>
              {isCategoryOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 rounded-2xl shadow-2xl overflow-hidden"
                >
                  <button 
                    onClick={() => { setActiveCategory('all'); setIsCategoryOpen(false); }}
                    className={`w-full text-left px-5 py-3 text-xs font-black uppercase tracking-widest hover:bg-blue-50 transition-colors ${activeCategory === 'all' ? 'bg-blue-50 text-blue-600' : 'text-gray-600'}`}
                  >
                    All Collections
                  </button>
                  {categories.map(cat => (
                    <button 
                      key={cat.id}
                      onClick={() => { setActiveCategory(cat.id); setIsCategoryOpen(false); }}
                      className={`w-full text-left px-5 py-3 text-xs font-black uppercase tracking-widest hover:bg-blue-50 transition-colors ${activeCategory === cat.id ? 'bg-blue-50 text-blue-600' : 'text-gray-600'}`}
                    >
                      {cat.title}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Dedicated Sport Search */}
          <div className="relative w-full md:max-w-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text"
              placeholder="Search sports designs (e.g. 'T-Shirt #5')..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-sm font-semibold transition-all"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        {filteredCategories.length > 0 ? (
          filteredCategories.map((category) => (
            <section key={category.id} className="mb-24">
            {/* Category Header */}
            <div className="mb-12 border-l-8 border-blue-600 pl-8">
              <h2 className="text-4xl font-black italic uppercase tracking-tighter mb-4">{category.title}</h2>
              <div className="max-w-3xl space-y-4">
                <p className="text-xl text-gray-700 font-semibold leading-tight">
                  {category.description}
                </p>
                <div className="flex flex-wrap gap-6 text-sm">
                  <div className="flex items-center gap-2 text-gray-500 font-bold uppercase tracking-wider">
                    <Maximize2 size={16} /> {category.sizeInfo}
                  </div>
                  <div className="flex items-center gap-2 text-gray-500 font-bold uppercase tracking-wider">
                    <Info size={16} /> {category.colorNote}
                  </div>
                </div>
              </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {category.images.map((img, index) => (
                <motion.div
                  key={`${category.id}-${index}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="group bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
                >
                  {/* Image Container */}
                  <div 
                    className="relative aspect-[4/5] overflow-hidden bg-gray-50 cursor-zoom-in"
                    onClick={() => setSelectedImage(img)}
                  >
                    <img 
                      src={img} 
                      alt={`${category.title} Design ${index + 1}`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="bg-white/90 p-2 rounded-full shadow-lg">
                        <ZoomIn size={20} className="text-gray-900" />
                      </div>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="p-6 flex-grow flex flex-col">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-black uppercase tracking-tight text-lg leading-tight">
                        {category.title} Design #{index + 1}
                      </h3>
                      <div className="text-blue-600 font-black text-xl tracking-tighter">
                        ${category.price}
                      </div>
                    </div>
                    <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-6">
                      Premium Custom {category.title}
                    </p>
                    
                    <button 
                      onClick={() => handleWhatsAppOrder(`${category.title} Design #${index + 1}`)}
                      className="mt-auto w-full bg-gray-900 text-white py-4 rounded-lg font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:bg-blue-600 transition-colors shadow-lg shadow-gray-900/10"
                    >
                      <MessageCircle size={18} />
                      Order via WhatsApp
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        ))
      ) : (
        <div className="py-24 text-center">
          <div className="inline-flex p-6 bg-gray-100 rounded-full mb-6">
            <Search size={48} className="text-gray-300" />
          </div>
          <h3 className="text-2xl font-black uppercase mb-2">No matching designs found</h3>
          <p className="text-gray-500 font-medium mb-8">Try adjusting your search terms or selecting a different collection.</p>
          <button 
            onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
            className="px-8 py-3 bg-gray-900 text-white font-black uppercase tracking-widest text-xs rounded-xl hover:bg-blue-600 transition-colors"
          >
            Reset All Filters
          </button>
        </div>
      )}
      </main>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-8"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-8 right-8 text-white hover:text-blue-500 transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X size={40} />
            </button>
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-5xl w-full h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={selectedImage} 
                alt="Product Preview" 
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Call to Action Section */}
      <section className="bg-gray-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-black italic uppercase tracking-tighter mb-8">Ready to Start Your Bulk Order?</h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-12 font-medium">
            Join thousands of teams worldwide who trust our factory for their professional sports uniforms. High capacity, fast turnaround, and premium quality guaranteed.
          </p>
          <button 
            onClick={() => handleWhatsAppOrder('Bulk Order Inquiry')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-5 rounded-full font-black uppercase tracking-widest transition-all shadow-xl shadow-blue-600/20"
          >
            Get a Custom Quote
          </button>
        </div>
      </section>
    </div>
  );
};

export default SportStore;
