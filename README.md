# Reproduction

## vue-tsc works:

```bash
vue-tsc --noEmit -p tsconfig.json --composite false
```

## tsc doesn't work:

```bash
tsc --noEmit -p tsconfig.json --composite false
```

return

```text
src/App.tsx:9:10 - error TS2559: Type '{ $children: string; }' has no properties in common with type 'IntrinsicAttributes & Partial<{ symbol: any; replace: boolean; flat: boolean; exact: boolean; active: boolean; block: boolean; loading: boolean; disabled: boolean; size: string | number; ... 5 more ...; ripple: boolean; }> & Omit<...>'.

9         <VBtn>test</VBtn>
           ~~~~

src/App.tsx:10:27 - error TS2322: Type '{ color: string; onClick: () => void; }' is not assignable to type 'IntrinsicAttributes & Partial<{ symbol: any; replace: boolean; flat: boolean; exact: boolean; active: boolean; block: boolean; loading: boolean; disabled: boolean; size: string | number; ... 5 more ...; ripple: boolean; }> & Omit<...>'.
  Property 'onClick' does not exist on type 'IntrinsicAttributes & Partial<{ symbol: any; replace: boolean; flat: boolean; exact: boolean; active: boolean; block: boolean; loading: boolean; disabled: boolean; size: string | number; ... 5 more ...; ripple: boolean; }> & Omit<...>'.

10         <VBtn color="red" onClick={() => alert("clicked test2")}></VBtn>
                             ~~~~~~~


Found 2 errors in the same file, starting at: src/App.tsx:9
```

## Project setup

```bash
npm ci
```
