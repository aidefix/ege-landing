"use client";

import Script from "next/script";
import { useEffect } from "react";

import { reachGoal } from "@/lib/metrika";
import type { Goal } from "@/lib/metrika";
import { YANDEX_METRIKA_ID } from "@/lib/site";

/**
 * Счётчик и делегированный обработчик целей: серверные секции помечают
 * ссылки атрибутом data-ym-goal и остаются серверными.
 * webvisor выключен намеренно — он пишет содержимое полей формы.
 */
export function Metrika() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const goal = target.closest<HTMLElement>("[data-ym-goal]")?.dataset
        .ymGoal;
      if (goal) reachGoal(goal as Goal);
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  if (!YANDEX_METRIKA_ID) return null;

  return (
    <Script id="yandex-metrika" strategy="afterInteractive">
      {`(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
m[i].l=1*new Date();
for(var j=0;j<e.scripts.length;j++){if(e.scripts[j].src===r){return;}}
k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
(window,document,"script","https://mc.yandex.ru/metrika/tag.js","ym");
ym(${Number(YANDEX_METRIKA_ID)},"init",{clickmap:true,trackLinks:true,accurateTrackBounce:true,webvisor:false});`}
    </Script>
  );
}
