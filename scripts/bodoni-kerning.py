# Kullanım: python3 scripts/bodoni-kerning.py <özgün.woff2> <çıktı.woff2>   (pip install fonttools brotli)
# Bodoni Moda: eksik büyük harf + küçük harf kerning çiftlerini ekler (OFL 1.1 değişikliğe izin verir).
import sys
from fontTools.ttLib import TTFont
from fontTools.otlLib.builder import buildPairPosGlyphsSubtable
from fontTools.ttLib.tables import otTables as ot

src, dst = sys.argv[1], sys.argv[2]
f = TTFont(src)
cmap = f.getBestCmap()
g = lambda c: cmap[ord(c)]
gpos = f['GPOS'].table
latn = [s for s in gpos.ScriptList.ScriptRecord if s.ScriptTag == 'latn'][0].Script.DefaultLangSys
kern_lookups = [gpos.FeatureList.FeatureRecord[i].Feature.LookupListIndex for i in latn.FeatureIndex
                if gpos.FeatureList.FeatureRecord[i].FeatureTag == 'kern'][0]
hedef = gpos.LookupList.Lookup[kern_lookups[-1]]

def mevcut(a, b):
    for li in kern_lookups:
        for st in gpos.LookupList.Lookup[li].SubTable:
            cov = st.Coverage.glyphs
            if a not in cov: continue
            if st.Format == 1:
                for pv in st.PairSet[cov.index(a)].PairValueRecord:
                    if pv.SecondGlyph == b and pv.Value1 and pv.Value1.XAdvance: return pv.Value1.XAdvance
            else:
                c1 = st.ClassDef1.classDefs.get(a, 0); c2 = st.ClassDef2.classDefs.get(b, 0)
                v = st.Class1Record[c1].Class2Record[c2].Value1
                if v and getattr(v, 'XAdvance', 0): return v.XAdvance
    return 0

# UPM 2000. Değerler mevcut komşu çiftlerden türetildi (V-u -90 -> V-n/i; Y-u -130 -> Y-n/i; T-n -41 -> T-i).
KUME = {
  'V': {'iıjmnpr': -170, 'wy': -110},
  'Y': {'iıjmnpr': -180, 'wy': -140},
  'T': {'iıj': -90, 'vwx': -90, 'z': -90, 'g': -110},
  'W': {'a': -190, 'cçdeoöq': -200, 'gğ': -130, 'sş': -100, 'uü': -80, 'iıjmnpr': -140, 'vwxy': -100, 'z': -80, 't': -50, 'f': -60},
}
pairs = {}
for A, gruplar in KUME.items():
    if ord(A) not in cmap: continue
    for harfler, deger in gruplar.items():
        for c in harfler:
            if ord(c) not in cmap: continue
            if mevcut(g(A), g(c)) == 0:
                v = ot.ValueRecord(); v.XAdvance = deger
                pairs[(g(A), g(c))] = (v, None)
st = buildPairPosGlyphsSubtable(pairs, f.getReverseGlyphMap())
hedef.SubTable.insert(0, st)
hedef.SubTableCount = len(hedef.SubTable)
f.flavor = 'woff2'
f.save(dst)
print(dst, len(pairs), 'çift eklendi')
