import buildMakeForeneintrag from "./foreneintrag"
import buildMakeKategorie from "../kategorie"

const makeKategorie = buildMakeKategorie()
const makeForeneintrag = buildMakeForeneintrag({ makeKategorie })

export default makeForeneintrag
