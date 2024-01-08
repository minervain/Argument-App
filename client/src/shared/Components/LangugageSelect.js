import React from 'react'
import { useTranslation } from 'react-i18next'

function LangugageSelect() {
    const { i18n } = useTranslation();
    return (
        <div>
            <img
                src="https://flagcdn.com/32x24/tr.png"
                role='button'
                width="32"
                height="24"
                alt="tr"
                onClick={() => i18n.changeLanguage('tr')} />

            <img
                src="https://flagcdn.com/32x24/us.png"
                role='button'
                height="24"
                alt="24"
                onClick={() => i18n.changeLanguage('en')}></img></div>
    )
}

export default LangugageSelect