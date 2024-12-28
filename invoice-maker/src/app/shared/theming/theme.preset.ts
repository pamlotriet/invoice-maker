import { definePreset } from '@primeng/themes';
import Aura from '@primeng/themes/aura';
import { InputText } from 'primeng/inputtext';

export const MyPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '{zinc.50}',
      100: '{zinc.100}',
      200: '{zinc.200}',
      300: '{zinc.300}',
      400: '{zinc.400}',
      500: '{zinc.500}',
      600: '{zinc.600}',
      700: '{zinc.700}',
      800: '{zinc.800}',
      900: '{zinc.900}',
      950: '{zinc.950}',
    },
    // components: {
    //   InputText: {
    //     colorScheme: {
    //       light: {
    //         root: {
    //           background: '{zinc.50}',
    //           color: '{surface.700}',
    //         },
    //         subtitle: {
    //           color: '{surface.500}',
    //         },
    //       },
    //       dark: {
    //         root: {
    //           background: '{zinc.50}',
    //           color: '{surface.0}',
    //         },
    //         subtitle: {
    //           color: '{surface.400}',
    //         },
    //       },
    //     },
    //   },
    // },
    colorScheme: {
      light: {
        surface: {
          0: '#ffffff',
          50: '{zinc.50}',
          100: '{zinc.100}',
          200: '{zinc.200}',
          300: '{zinc.300}',
          400: '{zinc.400}',
          500: '{zinc.500}',
          600: '{zinc.600}',
          700: '{zinc.700}',
          800: '{zinc.800}',
          900: '{zinc.900}',
          950: '{zinc.950}',
        },
      },
      //   dark: {
      //     surface: {
      //       0: '#ffffff',
      //       50: '{zinc.50}',
      //       100: '{zinc.100}',
      //       200: '{zinc.200}',
      //       300: '{zinc.300}',
      //       400: '{zinc.400}',
      //       500: '{zinc.500}',
      //       600: '{zinc.600}',
      //       700: '{zinc.700}',
      //       800: '{zinc.800}',
      //       900: '{zinc.900}',
      //       950: '{zinc.950}',
      //     },
      //   },
    },
  },
});
