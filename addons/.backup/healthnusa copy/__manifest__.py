{
    'name': 'Healthnusa RME',
    'summary': 'Sistem Elektronik Kesehatan Nusantara',
    'category': 'healthnusa',
    'depends': ['base','web', 'hr'],
    'data': [
        'views/templates.xml',
    ],
    # 'demo': [
    #     'demo/demo_data.xml',
    # ],
    'assets': {
        'healthnusa.assets_app': [
            ('include', 'web._assets_helpers'),
            'web/static/lib/bootstrap/scss/_variables.scss',
            ('include', 'web._assets_core'),
            'healthnusa/static/src/*',
            'healthnusa/static/src/**/*',
            'healthnusa/static/src/components/**/*',
            'healthnusa/static/src/components/layout/**/*',
            'healthnusa/static/src/components/pages/**/*',
            'healthnusa/static/src/components/pages/doctor/**/*',
        ],
    },
    'sequence': 1,
    'auto_install': False,
    'installable': True,
    'application': True,
    'license': 'OPL-1',
}
